from rest_framework import serializers
from .models import Movies

class MovieSerializer():
    class Meta:
        model = Movies
        fields = '__all__'