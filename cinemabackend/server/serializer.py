from rest_framework import serializers
from .models import Movies

class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        db_table: 'movies'
        model = Movies
        # this passes all the fields
        fields = '__all__'
        # to restrict the fields do fields = [value1, value2, ...]