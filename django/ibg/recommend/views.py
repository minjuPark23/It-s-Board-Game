from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import viewsets
from .models import Score, Game, Recommend, User
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import numpy as np

from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import logging
from rest_framework import status

# 요청을 받아 응답을 반환해주는 객체

# Create your views here.

class UserView(viewsets.ModelViewSet):

    @api_view(['GET'])
    def recommend_user(request, user_no):
        print("평점 추천")
        # 추천 받아서 결과 반환

        # 이미 Recommend에 저장된 것 다 지우기
        Recommend.objects.filter(user_no=user_no).delete()

        games = Game.objects.all()
        game_list = pd.DataFrame(games.values("game_no", "game_category")).set_index("game_no")
        # print(game_list.loc[52])
        game_list['game_category'] = game_list['game_category'].fillna("")
        category_list = list(game_list['game_category'].apply(lambda x: x.split("|")))

        category_dummies = game_list['game_category'].str.get_dummies(sep="|")
        # print(category_dummies)
        category_dummies = category_dummies.replace(0, np.nan)

        scores = Score.objects.filter(user_no=user_no)
        score_list = pd.DataFrame(scores.values("score_no", "game_no", "user_no", "score_rating"))

        user_predict_list = score_list.merge(category_dummies, left_on="game_no", right_on="game_no")
        user_predict_list = user_predict_list.replace(0, np.nan)
        # category_dummies에서 해당 game_no 삭제하기
        # print("유저의 게임 목록을 이용한 예측값 적용 1: ")
        # print(user_predict_list)

        for cols in category_dummies.columns:
            user_predict_list[cols] = user_predict_list[cols] * user_predict_list['score_rating']
        # print(user_predict_list)

        user_profile = user_predict_list[category_dummies.columns].mean()
        # print("해당 카테고리에 대한 유저의 평균값 프로필: ")
        # print(user_profile)

        # 모든 게임에 대해서 predict 구하기
        # print(category_dummies)

        # 이미 한 게임은 지우자
        user_del_game_list = score_list['game_no']
        # print("지울 게임 목록: ")
        # print(user_del_game_list)

        # print(category_dummies)

        category_dummies.drop(user_del_game_list, axis=0, inplace=True)
        # print(category_dummies)
        game_list.drop(user_del_game_list, axis=0, inplace=True)
        # print(game_list)

        # category_dummies에서 유저가 사용한 게임 제거하기
        predict = []
        for idx, row in category_dummies.iterrows():
            # print(idx, row)
            # print(row[category_dummies.columns])
            predict.append((user_profile * row[category_dummies.columns]).mean())

        game_list['recommend_rating'] = predict
        predict = game_list.drop(['game_category'], axis=1)

        predict = predict.fillna(score_list['score_rating'].mean())

        # predict = predict.reset_index()
        # print(predict)
        # predict['user_no'] = user_no

        # print(predict)

        findUser = get_object_or_404(User, pk=user_no)
        for idx, row in predict.iterrows():
            # print(idx, row['recommend_rating'])
            findGame = get_object_or_404(Game, pk=idx)
            r = Recommend(game_no=findGame, user_no=findUser, recommend_rating=row['recommend_rating']);
            # print(r)
            r.save()



        # 유저별 추천 결과를 DB에 넣고 스프링이 DB에 접근
        # 유저별 추천 결과를 장고에서 받아서 스프링이 DB에 접근

        # pk로 하나만 가져오기
        # user = get_object_or_404(User, pk=user_no)
        # serializer = UserSerializer(user)

        # user_no로 여러개 가져올 수 있는지 test
        # user = User.objects.filter(user_no=user_no)
        # serializer = UserSerializer(user, many=True)

        # user_no로 score데이터 가져오기

        return Response()

    @api_view(['GET'])
    def recommend_by_category_similartiy(request, game_no):
        print(game_no)
        scores = Score.objects.all()
        score_data = pd.DataFrame(scores.values("score_no", "game_no", "user_no", "score_rating"))

        games = Game.objects.all()
        game_data = pd.DataFrame(games.values("game_no", 'game_name', 'game_category', 'game_total_score'))

        game_data['vote_count'] = score_data.groupby('game_no')["user_no"].count()

        c = game_data['game_total_score'].mean()
        m = game_data['vote_count'].quantile(0.008)

        def weighted_rating(x, m=m, c=c):
            v = x['vote_count']
            r = x['game_total_score']

            return (v / (v + m) * r) + (m / (m + v) * c)

        game_data = game_data.loc[game_data['vote_count'] >= m]
        game_data['game_weighted_score'] = game_data.apply(weighted_rating, axis=1) # 함수 인자로 m, c 넘겨줌

        game_data = game_data[game_data['game_category'] != 'nan']

        game_data['game_category'] = game_data['game_category'].apply(
            lambda x: x.replace('|', '/').replace(' ', '').replace('/', ' '))

        print(game_data)

        count_vector = CountVectorizer(ngram_range=(1, 3))
        c_vector_category = count_vector.fit_transform(game_data['game_category'])
        category_c_sim = cosine_similarity(c_vector_category, c_vector_category).argsort()[:, ::-1]

        game = Game.objects.get(game_no=game_no)
        print(type(game.game_name))
        print(game.game_name)
        game_name = game.game_name

        target_game_index = game_data[game_data['game_name'] == game_name].index.values

        sim_index = category_c_sim[target_game_index, :30].reshape(-1)

        sim_index = sim_index[sim_index != target_game_index]

        response = game_data.iloc[sim_index].sort_values('game_total_score', ascending=False)[:10]   # 게임 번호로 수정
        response = response['game_no'].tolist()
        response.insert(0, game_no)
        print(response)
        # response.iloc[0] = game_no
        return Response(response)