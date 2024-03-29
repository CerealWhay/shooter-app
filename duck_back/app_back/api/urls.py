from django.urls import path
from . import views

urlpatterns = [
    path('get-records', views.getData),
    path('add-record', views.addData),
]
