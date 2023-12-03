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
    shipping_street = models.CharField(db_column='shipping_street', max_length=255, default='')
    shipping_city = models.CharField(db_column='shipping_city', max_length=255, default='')
    shipping_state = models.CharField(db_column='shipping_state', max_length=255, default='')
    shipping_zip = models.CharField(db_column='shipping_zip', max_length=255, default='')

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
class Periods(models.Model):
    class Meta:
        db_table: 'periods'
    pid = models.IntegerField(db_column='pid',primary_key=True)
    start_time = models.TimeField(db_column='start_time')
    end_time = models.TimeField(db_column='end_time')

class Rooms(models.Model):
    class Meta:
        db_table: 'rooms'
    rid = models.IntegerField(db_column='rid', primary_key=True)
    seatsInRoom = models.IntegerField(db_column='seats', default='')
class Seats(models.Model):
    class Meta: 
        db_table: 'seats'
    sid = models.IntegerField(db_column='sid',primary_key=True)
    seat_number = models.IntegerField(db_column='seat_number', default='')
    room_id = models.ForeignKey(Rooms, on_delete=models.DO_NOTHING, db_column='room_id')
    available = models.IntegerField(db_column='available', default='')

class Showings(models.Model):
    class Meta:
        db_table: 'showings'
    shid = models.IntegerField(db_column='shid',primary_key=True)
    movie_id = models.ForeignKey(Movies, on_delete=models.DO_NOTHING, db_column='movie_id')
    period_id = models.ForeignKey(Periods, on_delete=models.DO_NOTHING, db_column='period_id')
    room_id = models.ForeignKey(Rooms, on_delete=models.DO_NOTHING, db_column='room_id')

class Promotions(models.Model):
    class Meta:
        db_table: 'promotions'
    pmid = models.IntegerField(db_column='pmid',primary_key=True)
    promotion_code = models.CharField(db_column='promotion_code', max_length=255, default='')
    percent = models.FloatField(db_column='percent', default='')
    start_date = models.DateField(db_column='start_date')
    end_date = models.DateField(db_column='end_date')
class Bookings(models.Model):
    class Meta:
        db_table: 'bookings'
    bid = models.IntegerField(db_column='bid',primary_key=True)
    user_id = models.ForeignKey(CustomUser,on_delete=models.DO_NOTHING, db_column='uid')
    showing_id = models.ForeignKey(Showings, on_delete=models.DO_NOTHING, db_column='showing_id')
    card_id = models.ForeignKey(Card, on_delete=models.DO_NOTHING, db_column='card_id')
    promotion_id = models.ForeignKey(Promotions, on_delete=models.DO_NOTHING, db_column='promotion_id')
    total = models.FloatField(db_column='total', default='')

class TicketType(models.Model):
    class Meta:
        db_table: 'ticket_types'
    ttid = models.IntegerField(db_column='ttid',primary_key=True)
    ticket_type = models.CharField(db_column='ticket_type', max_length=255, default='')
    price = models.IntegerField(db_column='price', default='')

class Tickets(models.Model):
    class Meta: 
        db_table: 'tickets'
    tid = models.IntegerField(db_column='tid',primary_key=True)
    booking_id = models.ForeignKey(Bookings, on_delete=models.DO_NOTHING, db_column='booking_id')
    ticket_type_id = models.ForeignKey(TicketType, on_delete=models.DO_NOTHING, db_column='ticket_type_id')
    seat_id = models.ForeignKey(Seats, on_delete=models.DO_NOTHING, db_column='seat_id')