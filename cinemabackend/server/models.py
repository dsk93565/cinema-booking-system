from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    id = models.IntegerField(primary_key=True)
    email = models.EmailField(unique=True)

class Movies(models.Model):
    id = models.IntegerField(primary_key=True)
    category = models.CharField(max_length=255, default='')
    cast = models.CharField(max_length=255, default='')
    director = models.CharField(max_length=255, default='')
    producer = models.CharField(max_length=255, default='')
    synopsis = models.CharField(max_length=1027, default='')
    reviews = models.CharField(max_length=1027, default='')
    trailer = models.CharField(max_length=1027, default='')
    rating = models.CharField(max_length=255, default='')
    name = models.CharField(max_length=255, default='')

    