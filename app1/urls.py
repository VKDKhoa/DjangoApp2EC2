from . import views
from django.urls import path

urlpatterns = [
    path('', views.home, name='homePage'),
    path('send-email/', views.send_email, name='sendEmail'),
]