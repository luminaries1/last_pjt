from drf_spectacular.views import SpectacularAPIView, SpectacularSwaggerView
from django.urls import path
from . import views


urlpatterns = [
    path('community-list/', views.community_list),
    path('<int:community_pk>/', views.community_detail),
    path('<int:community_pk>/comments/', views.comment_list),
    # path('<int:community_pk>/comments/detail/', views.comment_detail),
    # path('community/<int:community_pk>/comments/', views.comment_create),

    # # # 필수작성
    # path('schema/', SpectacularAPIView.as_view(), name='schema'),
    # # # optional UI
    # path('swagger/', SpectacularSwaggerView.as_view(url_name='schema'), name='swagger-ui'),
    # ${API_URL}/${this.community.id}/comments/
]