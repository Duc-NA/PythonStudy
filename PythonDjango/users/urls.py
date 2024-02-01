from . import views
from django.urls import path

urlpatterns = [
    path("", views.get,name="get"),
    path("<int:user_id>", views.getUserById,name="get"),
]
               
#djaneiro 