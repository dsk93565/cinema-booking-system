from rest_framework import serializers
from .models import Movies, CustomUser, Card, Showings

class UserSerializer(serializers.ModelSerializer):
        class Meta: 
               model = CustomUser
               fields = ['username', 'email', 'phone_number', 'first_name', 
                         'last_name', 'type_id', 'state_id', 'promotions']

class ShowingSerializer(serializers.ModelSerializer):
       class Meta: 
              model = Showings
              fields = ['shid', 'movie_id', 'period_id', 'room_id', 'room_id', 'show_date'] 
class MovieSerializer(serializers.ModelSerializer):
        class Meta:
            model = Movies
            # this passes all the fields
            fields = ['mid', 'category', 'cast', 'director', 'producer', 'synopsis', 'reviews', 'trailer', 'rating', 'title', 'poster_path']
            # to restrict the fields do fields = [value1, value2, ...]