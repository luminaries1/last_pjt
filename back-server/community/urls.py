from django.urls import path
from . import views


urlpatterns = [
    path('community-list/', views.community_list),
    path('<int:community_pk>/', views.community_detail),
    path('<int:community_pk>/comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
]