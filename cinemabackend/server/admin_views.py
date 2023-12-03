from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movies, CustomUser, Card, Periods, Showings, Rooms, Promotions
from .serializer import MovieSerializer, UserSerializer
from .utils import *
import json, random

# EXPECTED REQUEST
# {user_token, category, cast, director, producer, 
#  synopsis, reviews, trailer, rating, title, poster_path}
class AddMovie(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user = getUserFromToken(data.get('user_token'))
            if user is None or user.type_id != 2:
                return({"error:"-1})
            new_movie = Movies.objects.create(category=data.get('category'), 
                                              cast=data.get('cast'),
                                              director=data.get('director'), 
                                              producer=data.get('producer'), 
                                              synopsis=data.get('synopsis'), 
                                              reviews=data.get('reviews'),
                                              trailer=data.get('trailer'), 
                                              rating=data.get('rating'), 
                                              title=data.get('title'), 
                                              poster_path=data.get('poster_path'))
            new_movie.save()    
        except json.JSONDecodeError:
            return Response({"error": -1})

# EXPECTED REQUEST
# {user_token, mid, category, cast, director, producer, 
#  synopsis, reviews, trailer, rating, title, poster_path}
class EditMovie(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user = getUserFromToken(data.get('user_token'))
            movie = Movies.objects.get(mid=data.get('mid'))
            if user is None or user.type_id != 2 or movie is None:
                return Response({"error:"-1})
            movie.category=data.get('category') 
            movie.cast=data.get('cast')
            movie.director=data.get('director') 
            movie.producer=data.get('producer') 
            movie.synopsis=data.get('synopsis') 
            movie.reviews=data.get('reviews')
            movie.trailer=data.get('trailer') 
            movie.rating=data.get('rating')
            movie.title=data.get('title')
            movie.poster_path=data.get('poster_path')
            movie.save()    
        except json.JSONDecodeError:
            return Response({"error": -1})

# EXPECTED REQUEST
# {mid, pid, rid}
class AddShow(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user = getUserFromToken(data.get('user_token'))
            if user is None or user.type_id != 2:
                return({"error:"-1})
            period = Periods.objects.get(pid=data.get('pid'))
            movie = Movies.objects.get(mid=data.get('mid'))
            room = Rooms.objects.get(rid=data.get('rid'))
            showing = Showings.objects.create(movie_id=movie,period_id=showing,room_id=room)
        except json.JSONDecodeError:
            return Response({"error": -1})

# EXPECTED REQUEST
# {promotion_code, percent}
class AddPromo(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            promo = Promotions.objects.create(promotion_code=data.get('promotion_code'), percent=data.get('percent'))
            promo.save()
        except:
            return Response({"error": -1})
        
