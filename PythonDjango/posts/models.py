from django.db import models

# Create your models here.

"""
class Post:
    id int
    title str(50)
    content text
    created datatime
"""

# Create your models here.
class Post(models.Model):
  id = models.AutoField(
    primary_key=True
  )

  text = models.TextField(
    max_length=1000,
    null=False,
    blank=False
  )

  creation_date = models.DateTimeField(
    auto_now_add=True,
    null=False,
    blank=False
  )

  class Meta:
    db_table = 'Post'