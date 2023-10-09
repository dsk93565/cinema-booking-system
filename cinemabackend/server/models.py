from django.db import models

# Create your models here.

class Movies(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=40)
    release_date = models.DateField()
    #ForeignKey example
    # #screenings = models.ForeignKey(MovieTimes, ...)