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
#Import TfIdfVectorizer from scikit-learn
from sklearn.feature_extraction.text import TfidfVectorizer
# Import linear_kernel
from sklearn.metrics.pairwise import linear_kernel


# 요청을 받아 응답을 반환해주는 객체

# Create your views here.
from .serializers import GameListSerializer


class UserView(viewsets.ModelViewSet):

    @api_view(['GET'])
    def recommend_desc(self, game_no):
        print("유저가 한 게임 중 비슷한 유형별")
        print(game_no)
        df_games = Game.objects.all()
        df_games = pd.DataFrame(df_games.values("game_no", "game_name", "game_desc"))

        # Define a TF-IDF Vectorizer Object. Remove all english stop words such as 'the', 'a'
        tfidf = TfidfVectorizer(stop_words='english')

        # Replace NaN with an empty string
        df_games['game_desc'] = df_games['game_desc'].fillna('')

        # Construct the required TF-IDF matrix by fitting and transforming the data
        tfidf_matrix = tfidf.fit_transform(df_games['game_desc'])

        # Output the shape of tfidf_matrix
        print(tfidf_matrix.shape)

        # 300개의 게임을 설명하는데 7000개 이상의 다른 단어가 사용되었다. 이 행렬을 사용해 유사성 점수를 계산할 수 있습니다. 코사인 유사성을 사용해 두 영화간의 유사성을 계산한다.
        # 코사인 유사성 사용 이유: 크기와 무관하고 계산이 비교적 쉽고 빠르기 때문.
        # Compute the cosine similarity matrix
        cosine_sim = linear_kernel(tfidf_matrix, tfidf_matrix)

        # Construct a reverse map of indices and movie titles
        indices = pd.Series(df_games.index, index=df_games.index).drop_duplicates()

        # Function that takes in movie title as input and outputs most similar movies
        def get_recommendations(title, cosine_sim=cosine_sim):
            # Get the index of the movie that matches the title
            idx = indices[title]

            # Get the pairwsie similarity scores of all movies with that movie
            sim_scores = list(enumerate(cosine_sim[idx]))

            # Sort the movies based on the similarity scores
            sim_scores = sorted(sim_scores, key=lambda x: x[1], reverse=True)

            # Get the scores of the 10 most similar movies
            sim_scores = sim_scores[1:31]

            # Get the movie indices
            game_indices = [i[0] for i in sim_scores]

            # Return the top 10 most similar movies
            return df_games['game_name'].iloc[game_indices]

        recommendations = get_recommendations(game_no)
        print(recommendations)

        game_no_list = list(recommendations.index)
        print(game_no_list)
        return Response(game_no_list)

    @api_view(['GET'])
    def recommend_popular(request):
        print("평점수 대비 평점이 높은 것: 인기순")
        df_games = Game.objects.all()
        df_games = pd.DataFrame(df_games.values("game_no", "game_total_score"))
        # print(df_games)
        df_scores = Score.objects.all()
        df_scores = pd.DataFrame(df_scores.values("user_no", "game_no", "score_rating"))
        # print(df_scores)

        df_games['score_count'] = df_scores.groupby('game_no')['user_no'].sum()

        C = df_games['game_total_score'].mean()
        # print("C ", C)

        # 게임이 차트에 오르려면 목록에 있는 게임의 투표수가 90%이 되어야 한다.
        m = df_games['score_count'].quantile(0.9)
        # print("m ", m)

        q_games = df_games.copy().loc[df_games['score_count'] >= m]

        def weighted_rating(x, m=m, C=C):
            v = x['score_count']
            R = x['game_total_score']
            # Calculation based on the IMDB formula
            return (v / (v + m) * R) + (m / (m + v) * C)

        q_games['score2'] = q_games.apply(weighted_rating, axis=1)
        q_games = q_games.sort_values('score2', ascending=False)

        game_list = list(q_games['game_no'])
        print(game_list)

        # print(q_games)
        # user = User.objects.filter(user_no=user_no)
        # game = Game.objects.filter(game_no__in=game_list)
        # serializer = GameListSerializer(game, many=True)

        return Response(game_list)

    @api_view(['GET'])
    def recommend_user2(request, user_no):
        print("평점 추천2")
        # 이미 Recommend에 저장된 것 다 지우기
        Recommend.objects.filter(user_no=user_no).delete()

        games = Game.objects.all()
        game_list = pd.DataFrame(games.values("game_no", "game_category"))

        scores = Score.objects.all()
        score_list = pd.DataFrame(scores.values("score_no", "game_no", "user_no", "score_rating"))

        user_game_score = pd.merge(score_list, game_list, on="game_no")
        # print(user_game_score)

        # 사용자의 각 영화 평점
        user_game_score = user_game_score.pivot_table('score_rating', index='user_no', columns="game_no")
        # print(user_game_score)

        df_user_game_score = user_game_score.fillna(0)

        matrix = df_user_game_score.to_numpy()
        # 총 유저 평점의 평균
        user_score_mean = np.mean(matrix, axis=1)
        # print(user_score_mean)

        matrix_user_mean = matrix - user_score_mean.reshape(-1, 1)

        U, sigma, Vt = svds(matrix_user_mean, k=12)

        sigma = np.diag(sigma)

        # 원본 행렬 복구. 내적 수행
        svd_user_predicted_scores = np.dot(np.dot(U, sigma), Vt) + user_score_mean.reshape(-1, 1)

        df_svd_preds = pd.DataFrame(svd_user_predicted_scores, columns=df_user_game_score.columns)

        def recommend_games(df_svd_preds, user_id, ori_games_df, ori_ratings_df, num_recommendations=5):
            # 현재 index로 적용 되어 있으므로 user_id-1 해야함.
            user_row_number = user_id - 1

            # 최종적으로 만든 pred_df에서 사용자 index에 따라 영화 데이터 정렬 -> 영화 평점이 높은 순으로 정렬
            sorted_user_predictions = df_svd_preds.iloc[user_row_number].sort_values(ascending=False)

            # 원본 평점 데이터에서 user_id에 해당하는 데이터 뽑기
            user_data = ori_ratings_df[ori_ratings_df.user_no == user_id]

            # 위에서 뽑은 user_data와 원본 데이터를 합친다.
            user_history = user_data.merge(ori_games_df, on='game_no').sort_values(['score_rating'], ascending=False)

            # 원본 게임 데이터에서 사용자가 한 게임 데이터를 제외한 데이터 추출
            recommendations = ori_games_df[~ori_games_df['game_no'].isin(user_history['game_no'])]
            # 사용자의 게임 평점이 높은 순으로 정렬된 데이터와 위 recommendations를 합친다.
            recommendations = recommendations.merge(pd.DataFrame(sorted_user_predictions).reset_index(), on='game_no')
            # 컬럼명을 변경하고 정렬해서 return
            recommendations = recommendations.rename(columns={user_row_number: 'Predictions'}).sort_values(
                'Predictions',
                ascending=False).iloc[
                              :num_recommendations, :]

            return user_history, recommendations

        already_rated, predictions = recommend_games(df_svd_preds, user_no, game_list, score_list, 10)

        print(predictions)

        return Response()

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
