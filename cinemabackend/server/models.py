from django.db import models
from django.contrib.auth.models import AbstractUser
# Create your models here.

#comment
class CustomUser(AbstractUser):
    class Meta: 
        db_table = 'users'
    uid = models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')
    type_id = models.IntegerField(db_column='type_id', default='1')
    email = models.EmailField(db_column='email', unique=True, max_length=255, default='')
    password = models.CharField(db_column='user_password', max_length=255, default='')
    first_name = models.CharField(db_column='first_name', max_length=255, default='')
    last_name = models.CharField(db_column='last_name', max_length=255, default='')
    username = models.CharField(default='nothing', unique=True, max_length=255)
    phone_number = models.IntegerField(db_column='phone_number')
    state_id = models.IntegerField(db_column='state_id', default='')
    verification_code = models.IntegerField(db_column='verification_code', default=0)
    promotions = models.IntegerField(db_column='promotions', default=0)

class Encryption_Keys(models.Model):
    encryption_key = models.CharField(db_column='encryption_key', max_length=255)
    user_id = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, db_column='user_id')

class Card(models.Model):
    class Meta: 
        db_table = 'cards'
    cid = models.BigAutoField(auto_created=True, serialize=False, db_column='cid', primary_key=True)
    user_id = models.ForeignKey(CustomUser, on_delete=models.DO_NOTHING, db_column='user_id')
    card_type = models.CharField(db_column='card_type', max_length=255, default='')
    card_number = models.CharField(db_column='card_number', max_length=255, default='')
    card_expiration = models.CharField(db_column='card_expiration', max_length=255, default='')
    card_street = models.CharField(db_column='card_street', max_length=255, default='')
    card_city = models.CharField(db_column='card_city', max_length=255, default='')
    card_state = models.CharField(db_column='card_state', max_length=255, default='')
    card_zip = models.CharField(db_column='card_zip', max_length=255, default='')

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
    poster_path = models.CharField(db_column='image',max_length=255, default='')
    class Meta: 
        db_table: 'movies'

    