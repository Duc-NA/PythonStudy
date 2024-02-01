from django.db import models

# Create your models here.
class User(models.Model):
  Id = models.AutoField(
    primary_key=True
  )

  UserName = models.TextField(
    max_length=50,
    null=False,
    blank=False
  )

  Email = models.TextField(
    max_length=100,
    null=False,
    blank=False
  )

  Password = models.TextField(
    max_length=255,
    null=False,
    blank=False
  )

  class Meta:
    db_table = 'User'