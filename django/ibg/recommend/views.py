from django.shortcuts import render
from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import viewsets
from .serializers import PostSerializer, UserSerializer, ScoreListSerializer
from .models import Post, User, Score
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
    def recommand_user(request, user_no):
        print("recommand_user")
        # 추천 받아서 결과 반환


        # 유저별 추천 결과를 DB에 넣고 스프링이 DB에 접근
        # 유저별 추천 결과를 장고에서 받아서 스프링이 DB에 접근

        # pk로 하나만 가져오기
        # user = get_object_or_404(User, pk=user_no)
        # serializer = UserSerializer(user)

        # user_no로 여러개 가져올 수 있는지 test
        # user = User.objects.filter(user_no=user_no)
        # serializer = UserSerializer(user, many=True)

        # user_no로 score데이터 가져오기
        scores = Score.objects.filter(user_no=user_no)
        serializer = ScoreListSerializer(scores, many=True)

        return Response(serializer.data)
