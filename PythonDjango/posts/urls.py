from . import views
from django.urls import path

urlpatterns = [
    path("", views.list_posts,name="list_posts"),
    path("homepage", views.homepage,name="posts_home"),
    path("<int:post_id>", views.post_detail,name="posts_detail"),
]
               
#djaneiro 