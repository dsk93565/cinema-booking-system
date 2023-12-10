from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movies, CustomUser, Card, Periods, Showings, Rooms, Promotions, Movie_States, Seats, Logical_Seats
from .serializer import MovieSerializer, UserSerializer, PeriodSerializer
from .utils import *
import json, random


#Need to added user_token to check for admin here 
#just uncomment the code
class GetUsers(APIView):
    def get(self, request):
        # try: 
        #     data = json.loads(request.body.decode('utf-8'))
        #  except json.JSONDecodeError:
        #     return Response({"error": -1})
        # user_token = data.get('user_token')
        # if checkAdmin(user_token) is None:
        #         return Response({'error': -1})
        queryset = CustomUser.objects.all()
        serializer_class = UserSerializer(queryset, many=True)
        userList = {"users":serializer_class.data}
        return Response(userList)

#expects uid, and user_token (this is for admin auth)
class SuspendUser(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                return Response({'error': -1})
            user = CustomUser.objects.get(data.get('uid'))
            user.state_id = 3
            user.save()
            return Response({"success": 1})
        except json.JSONDecodeError:
            return Response({"error": -1})
# EXPECTED REQUEST
# {user_token, category, cast, director, producer, 
#  synopsis, reviews, trailer, rating, title, poster_path}
class AddMovie(APIView):
    def post(self, request):
        try: 
            response = json.loads(request.body.decode('utf-8'))
            # Load the JSON string from the 'body' field
            data = json.loads(response['body'])
            # Extract the userToken
            user_token = data['userToken']
            if checkAdmin(user_token) is None:
                return Response({'error': -1})
            msid = data.get('msid')
            moviestate = Movie_States.objects.get(msid=msid)
            new_movie = Movies.objects.create(release_date=data.get('release_date'), 
                                              category=data.get('category'), 
                                              cast=data.get('cast'),
                                              director=data.get('director'), 
                                              producer=data.get('producer'), 
                                              synopsis=data.get('synopsis'), 
                                              reviews=data.get('reviews'),
                                              trailer=data.get('trailer'), 
                                              rating=data.get('rating'), 
                                              title=data.get('title'), 
                                              poster_path=data.get('poster_path'),
                                              state_id=moviestate)
            new_movie.save()
        except json.JSONDecodeError:
            return Response({"error": -1})
        return Response({'mid': new_movie.mid})

#expects MID, user_token
class ArchiveMove(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                return Response({'error': -1})
            mid = data.get('mid')
            movie = Movies.objects.get(mid=mid)
            movie.state_id = 1
            movie.save()
            return Response({"success": 1})
        except json.JSONDecodeError:
            return Response({"error": -1})
# EXPECTED REQUEST
# {user_token, mid, category, cast, director, producer, 
#  synopsis, reviews, trailer, rating, title, poster_path}
class EditMovie(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                return Response({'error': -1})
            movie = Movies.objects.get(mid=data.get('mid'))
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
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                return Response({'error': -1})
            period = Periods.objects.get(pid=data.get('pid'))
            movie = Movies.objects.get(mid=data.get('mid'))
            room = Rooms.objects.get(rid=data.get('rid'))
            seats = Seats.objects.filter(room_id=room)
            for i in room.seatsInRoom:
                seat = seats.filter(seat_number=i)
                logical_seat = Logical_Seats.objects.create(seat_id=seat, period_id=period, available=1)
                logical_seat.save()
            showing = Showings.objects.create(movie_id=movie,period_id=showing,room_id=room)
        except json.JSONDecodeError:
            return Response({"error": -1})
        
class RemoveShow(APIView):
    def post(self, request):
        return Response({'left to be implemented': -1})

# EXPECTED REQUEST
# {promotion_code, percent}
class AddPromo(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                return Response({'error': -1})
            promo = Promotions.objects.create(promotion_code=data.get('promotion_code'), percent=data.get('percent'))
            promo.save()
        except:
            return Response({"error": -1})
        
#returns periods: {pid, start_time, end_time}
class GetPeriods(APIView):
    def get(self, request):
        try: 
            user_token = json.loads(request.data.get('user_token'))
            if checkAdmin(user_token) is None:
                return Response({'error': -1})
            periods = Periods.objects.all()
            serializer = PeriodSerializer(periods, many=True)
            period_data = {'periods': serializer.data}
            return(period_data)
        except:
            return Response({"error": -1})