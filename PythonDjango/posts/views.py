from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import Post
from .serializers import PostSerializer
import json

@api_view(http_method_names=["GET"])
def get(request:Request):
    queryset = Post.objects.all()
    read_serializer = PostSerializer(queryset, many=True)
    return Response(read_serializer.data, status=status.HTTP_200_OK)

@api_view(http_method_names=["POST"])
def post(request:Request):
    data=request.data
    print(json.dumps(data))
    create_serializer = PostSerializer(data=data)
    if create_serializer.is_valid():
      todo_item_object = create_serializer.save()
      read_serializer = PostSerializer(todo_item_object)
      return Response(read_serializer.data, status=status.HTTP_201_CREATED)
    return Response("", status=status.HTTP_400_BAD_REQUEST)