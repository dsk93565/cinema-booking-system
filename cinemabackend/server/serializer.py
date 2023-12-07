from rest_framework import serializers
from .models import Movies, CustomUser, Card, Showings,Movie_States, Promotions

class PromoSerializer(serializers.ModelSerializer):
       class Meta:
              model = Promotions
              fields = ['pmid', 'promotion_code', 'percent', 'start_date', 'end_date']
class UserSerializer(serializers.ModelSerializer):
        password_length = serializers.SerializerMethodField()
        def password_length(self, obj):
              return len(obj.password)
        class Meta: 
               model = CustomUser
               fields = ['username', 'email', 'phone_number', 'first_name', 
                         'last_name', 'type_id', 'state_id', 'promotions',
                         'shipping_street', 'shipping_city', 'shipping_state', 'shipping_zip', 'password_length']
       
       

class ShowingSerializer(serializers.ModelSerializer):
       class Meta: 
              model = Showings
              fields = ['shid', 'movie_id', 'period_id', 'room_id', 'room_id', 'show_date'] 
class MovieSerializer(serializers.ModelSerializer):
        state_id = serializers.CharField(source='state_id.msid', read_only=True)
        class Meta:
            model = Movies
            # this passes all the fields
            fields = ['mid', 'category', 'cast', 'director', 'producer', 'synopsis', 'reviews', 'trailer', 'rating', 'title', 'poster_path', 'state_id']
            # to restrict the fields do fields = [value1, value2, ...]