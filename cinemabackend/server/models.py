from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    id = models.IntegerField(primary_key=True)
    email = models.EmailField(unique=True)

class Movies(models.Model):
    mid = models.IntegerField(db_column='mid',primary_key=True)
    category = models.CharField(db_column='category', max_length=255, default='')
    cast = models.CharField(db_column='cast',max_length=255, default='')
    director = models.CharField(db_column='director',max_length=255, default='')
    producer = models.CharField(db_column='producer',max_length=255, default='')
    synopsis = models.CharField(db_column='synopsis',max_length=1027, default='')
    reviews = models.CharField(db_column='reviews',max_length=1027, default='')
    trailer = models.CharField(db_column='trailer',max_length=1027, default='')
    rating = models.CharField(db_column='rating',max_length=255, default='')
    title = models.CharField(db_column='title',max_length=255, default='')
    class Meta: 
        db_table: 'movies'

    