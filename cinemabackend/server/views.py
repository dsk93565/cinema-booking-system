from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import (
    Movies,
    Rooms,
    Showings,
    Promotions,
)
from .serializer import (
    MovieSerializer,
    ShowingSerializer,
    PromoSerializer
)
from .utils import *
import json, random

# returns {promotions}
class GetPromo(APIView):
    def get(self, request):
        queryset = Promotions.objects.all()
        serializer_class = PromoSerializer(queryset, many=True)
        promoList = {"promotions": serializer_class.data}
        return Response(promoList)


# expects promo_code
# returns percent or wrong_promo
class CheckPromo(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
            promo = Promotions.objects.get(promotion_code=data.get("promo_code"))
            if promo is None:
                return Response({"wrong_promo": -1})
            else:
                return Response({"percent": promo.percent})
        except json.JSONDecodeError:
            return Response({"error": -1})


# expects      mid,
# (optional)   start_date, end_date
# dates should be formated as 2023-01-01
# returns
# showings: ['shid', 'movie_id', 'period_id', 'room_id', 'room_id', 'show_date']
class GetShows(APIView):
    def get(self, request):
        try:
            showObjects = getShowObjects(request)
            serializer = ShowingSerializer(showObjects, many=True)
            showings = {"showings": serializer.data}
            return Response(showings)
        except json.JSONDecodeError:
            return Response({"error": -1})
class MovieList(APIView):
    def get(self, request):
        queryset = Movies.objects.all()
        serializer_class = MovieSerializer(queryset, many=True)
        movies_data = serializer_class.data

        sorted_movies = {
            "Now Playing": [],
            "Trending": [],
            "Coming Soon": [],
        }

        for movie in queryset:
            state_id = movie.state_id.msid
            serialized_movie = MovieSerializer(
                movie
            ).data  # Serialize the movie instance
            if state_id == 2:
                sorted_movies["Now Playing"].append(serialized_movie)
            elif state_id == 3:
                sorted_movies["Trending"].append(serialized_movie)
            elif state_id == 4:
                sorted_movies["Coming Soon"].append(serialized_movie)

        return Response(sorted_movies)


class Movie(APIView):
    def get(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        queryset = Movies.objects.filter(mid=data.get("mid"))
        serializer_class = MovieSerializer(queryset, many=True)
        movieList = {"movies": serializer_class.data}
        return Response(movieList)
