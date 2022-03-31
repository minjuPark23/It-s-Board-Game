from abc import ABC

from rest_framework import serializers
from .models import Post, User, Game, Score

# django는 기존에 HTML로 렌더링되어 Response로 응답을 보내게 되는데
# JSON으로 데이터를 전송해야 하기 때문에 HTML로 렌더링 되지 않고 JSON으로 매핑되도록 Serialize 과정을 거쳐야 한다.
class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = [
            'id',
            'title',
            'subtitle',
            'content',
            'created_at',
        ]


class GameListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Game
        fields = [
            'game_no'
        ]


class ScoreListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Score
        fields = [
            'score_no',
            'user_no',
            'game_no',
            'score_rating'
        ]


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        user_no = serializers.CharField(source='user.user_no', read_only=True)
        model = User    # 변환할 모델명
        fields = [  # 직접 명시 or "__all__"
            'user_no',
            'user_auth',
            'user_email',
            'user_nick',
            'user_pwd',
        ]

