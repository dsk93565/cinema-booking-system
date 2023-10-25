from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.


class CustomUser(AbstractUser):
    id = models.IntegerField(primary_key=True)
    email = models.EmailField(unique=True)

class Movies(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=40)
    release_date = models.DateField()
    #ForeignKey example
    # #screenings = models.ForeignKey(MovieTimes, ...)