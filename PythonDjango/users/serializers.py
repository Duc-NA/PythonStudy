from rest_framework import serializers

from .models import User


class UserSerializer(serializers.ModelSerializer):
  def create(self, validated_data):
    return User.objects.create(
      text=validated_data.get('text')
    )

  def update(self, instance, validated_data):
    instance.text = validated_data.get('text', instance.text)
    instance.save()
    return instance
  
  class Meta:
    model = User
    fields = (
      'Id',
      'UserName',
      'Email',
      'Password',
    )