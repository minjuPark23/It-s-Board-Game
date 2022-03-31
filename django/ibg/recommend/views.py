from django.shortcuts import render
from rest_framework import viewsets
from .serializers import PostSerializer, UserSerializer
from .models import Post, User
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
    def perform_select(self, serializer):
        users = User.objects.all()
        # 추천 받아서 결과 반환
        # 유저별 추천 결과를 DB에 넣고 스프링이 DB에 접근
        # 유저별 추천 결과를 장고에서 받아서 스프링이 DB에 접근
        serialized_users = UserSerializer(users, many=True)
        return Response(serialized_users.data)
