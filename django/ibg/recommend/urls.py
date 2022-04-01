from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import UserView


urlpatterns = format_suffix_patterns([
    path('auth/', include('rest_framework.urls', namespace='rest_framework')),
    path("user/predict/<int:user_no>/",  UserView.recommend_user)
])