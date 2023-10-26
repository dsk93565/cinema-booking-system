from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movies
from .serializer import MovieSerializer
import json

class MovieList(APIView):
    def get(self, request):
        queryset = Movies.objects.all()
        print("queryset:", queryset)
        serializer_class = MovieSerializer(queryset, many=True)
        print(serializer_class.data)
        return Response(serializer_class.data)
    
# Create your views here.
