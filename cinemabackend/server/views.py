from django.shortcuts import render
from rest_framework import generics
from .models import Movies
from .serializer import MovieSerializer

class MovieList(generics.ListAPIView):
    queryset = Movies.objects.all()
    serializer_class = MovieSerializer
# Create your views here.
