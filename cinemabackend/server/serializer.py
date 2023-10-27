from rest_framework import serializers
from .models import Movies

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movies
        # this passes all the fields
        fields = ['mid', 'category', 'cast', 'director', 'producer', 'synopsis', 'reviews', 'trailer', 'rating', 'title']
        # to restrict the fields do fields = [value1, value2, ...]