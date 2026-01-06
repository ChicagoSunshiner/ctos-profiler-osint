from django.urls import path
from .views import ProfilerAPIView

urlpatterns = [
    path('profile/<str:username>/', ProfilerAPIView.as_view()),
]