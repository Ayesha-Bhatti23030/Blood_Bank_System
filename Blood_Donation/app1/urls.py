from rest_framework_simplejwt.views import TokenRefreshView
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from app1 import views


router = DefaultRouter()


urlpatterns = [
    path('', include(router.urls)),
    path("token/",views.MyTokenObtainPairView.as_view()),
    path("token/refresh/",TokenRefreshView.as_view()),
    path("register/",views.RegisterView.as_view()),
    path("dashboard/",views.dashboard),
]


