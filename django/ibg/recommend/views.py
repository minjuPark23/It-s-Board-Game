from django.shortcuts import render
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import viewsets
from .serializers import PostSerializer, UserSerializer
from .models import Post, User, Score, Game
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
import pandas as pd
import numpy as np


# 요청을 받아 응답을 반환해주는 객체

# Create your views here.
class PostView(viewsets.ModelViewSet):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = (permissions.IsAuthenticated,)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class UserView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # permission_classes = (permissions.IsAuthenticated,)

    @api_view(['POST'])
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    @api_view(['GET'])
    def recommend_user(request, user_no):
        print("평점 추천")
        # 추천 받아서 결과 반환

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

        # for i in datas.index:
            # print(datas.loc[i])

        user_predict_list = score_list.merge(category_dummies, left_on="game_no", right_on="game_no")
        user_predict_list = user_predict_list.replace(0, np.nan)
        # print(recommend)

        for cols in category_dummies.columns:
            user_predict_list[cols] = user_predict_list[cols] * user_predict_list['score_rating']
        # print(user_predict_list)

        user_profile = user_predict_list[category_dummies.columns].mean()
        # print(user_profile)

        # 모든 게임에 대해서 predict 구하기기
        # print(category_dummies)

        predict = []
        for idx, row in category_dummies.iterrows():
            # print(idx, row)
            # print(row[category_dummies.columns])
            predict.append((user_profile * row[category_dummies.columns]).mean())

        game_list['predict'] = predict
        predict = game_list.drop(['game_category'], axis=1)

        predict = predict.fillna(score_list['score_rating'].mean())

        print(predict)


       # 유저별 추천 결과를 DB에 넣고 스프링이 DB에 접근
        # 유저별 추천 결과를 장고에서 받아서 스프링이 DB에 접근

        # pk로 하나만 가져오기
        # user = get_object_or_404(User, pk=user_no)
        # serializer = UserSerializer(user)

        # user_no로 여러개 가져올 수 있는지 test
        # user = User.objects.filter(user_no=user_no)
        # serializer = UserSerializer(user, many=True)

        # user_no로 score데이터 가져오기

        return Response(predict['scores'])
