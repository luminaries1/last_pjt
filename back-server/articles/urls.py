from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views


urlpatterns = [
    # legacy article code
    # path('articles/', views.article_list),
    # path('articles/<int:article_pk>/', views.article_detail),
    # path('comments/', views.comment_list),
    # path('comments/<int:comment_pk>/', views.comment_detail),
    # path('articles/<int:article_pk>/comments/', views.comment_create),



    path('movies/', views.movie_list),
    path('movies/randomMovie/', views.movie_random),
    path('movies/<int:movie_pk>/', views.movie_detail),
    path('comments/', views.comment_list),
    path('comments/<int:comment_pk>/', views.comment_detail),
    path('movies/<int:movie_pk>/comments/', views.comment_create),
    path('movies/<movie_keyword>/', views.movie_keyword),
    path('movies/<int:movie_pk>/related/', views.movie_related),
    # # 필수 작성
    path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # # optional UI
    path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
]
