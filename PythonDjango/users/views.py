from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view
from .models import User
from .serializers import UserSerializer
import json

# Create your views here.
@api_view(http_method_names=["GET"])
def get(request:Request):
    queryset = User.objects.all()
    read_serializer = UserSerializer(queryset, many=True)
    return Response(read_serializer.data, status=status.HTTP_200_OK)

@api_view(http_method_names=["GET"])
def getUserById(request:Request, id=None):
    queryset = User.objects.all()
    read_serializer = UserSerializer(queryset, many=True)
    return Response(read_serializer.data, status=status.HTTP_200_OK)