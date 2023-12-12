from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Movies, CustomUser, Card, Periods, Showings, Rooms, Promotions, Movie_States, Seats, Logical_Seats
from .serializer import MovieSerializer, UserSerializer, PeriodSerializer
from django.core.cache import cache
from .utils import *
import copy
import json, random


#Need to added user_token to check for admin here 
#just uncomment the code
class GetAllUsers(APIView):
    @check_admin
    def post(self, request):
        users = CustomUser.objects.all()
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

class MakeAdmin(APIView):
    @check_admin
    def post(self, request):
        try: 
            response = json.loads(request.body.decode('utf-8'))
            data = json.loads(response['body'])
            print(data)
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"})
        user_id = data.get('uid')
        try:
            user = CustomUser.objects.get(uid=user_id)
            user.type_id = 2  # Setting type_id to 2 to make the user an admin
            user.save()
            return Response({"success": 1})
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"})
        except Exception as e:
            return Response({"error": str(e)})

#expects uid, and user_token (this is for admin auth)
class SuspendUser(APIView):
    @check_admin
    def post(self, request):
        try:
            response = json.loads(request.body.decode('utf-8'))
            data = json.loads(response['body'])
            user = CustomUser.objects.get(uid=data.get('uid'))
            user.state_id = 3
            user.save()
            return Response({"success": 1})
        except json.JSONDecodeError:
            return Response({"error": -1})
# EXPECTED REQUEST
# {user_token, category, cast, director, producer, 
#  synopsis, reviews, trailer, rating, title, poster_path}

class EditUser(APIView):
    @check_admin
    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"})
        user_id = data.get('uid')
        try:
            user = CustomUser.objects.get(pk=user_id)
        except CustomUser.DoesNotExist:
            return Response({'error': "User not found"})

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({'success': 1})
        return Response(serializer.errors)        


# EXPECTED REQUEST
# {user_token, category, cast, director, producer, 
#  synopsis, reviews, trailer, rating, title, poster_path}
class AddMovie(APIView):
    @check_admin
    def post(self, request):
        try:
            response = json.loads(request.body.decode('utf-8'))
            data = json.loads(response['body'])
            print(data)
            msid = data.get('msid')
            moviestate = Movie_States.objects.get(msid=msid)
            # Use get_or_create to avoid creating duplicate entries
            new_movie, created = Movies.objects.get_or_create(
                release_date=data.get('release_date'),
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
                state_id=moviestate
            )

            if created:
                # The movie was created
                print("New movie created:", new_movie.title)
            else:
                # The movie already existed
                print("Movie already exists:", new_movie.title)

            return Response({'mid': new_movie.mid})
        except Exception as e:
            print("Error adding movie: ", str(e))
            return Response({"error": -1})



#expects MID, user_token
class ArchiveMove(APIView):
    @check_admin
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
    @check_admin
    def post(self, request):
        try: 
            cache.clear()
            response = json.loads(request.body.decode('utf-8'))
            data = json.loads(response['body'])
            movie = Movies.objects.get(mid=data.get('mid'))
            movie.release_date=data.get('release_date') 
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
            msid = data.get('msid')
            moviestate = Movie_States.objects.get(msid=msid)
            movie.state_id=moviestate
            movie.save()
        except json.JSONDecodeError:
            return Response({"error": -1})
        return Response({"success": movie.mid})

# EXPECTED REQUEST
# {user_token, mid, pid, rid ,date}
class AddShow(APIView):
    @check_admin
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            inner_data = data['body']
            data = json.loads(inner_data)
            print(data)
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                print("No token")
                return Response({'error': -1})
            period = Periods.objects.get(pid=data.get('pid'))
            movie = Movies.objects.get(mid=data.get('mid'))
            room = Rooms.objects.get(rid=data.get('rid'))
            date = data.get('date')
            print("Room: ", copy.deepcopy(room))
            seats = Seats.objects.filter(room_id=room)
            print("Seats: ", copy.deepcopy(seats))
            for i in range(1, room.seatsInRoom):
                print(i)
                seat = seats.filter(seat_number=i).first()
                print("seat: ", copy.deepcopy(seat))
                logical_seat = Logical_Seats.objects.create(seat_id=seat, period_id=period, available=1)
                logical_seat.save()
            showing, created = Showings.objects.get_or_create(movie_id=movie, period_id=period, room_id=room, show_date=date)
            if created:
                print("New showing created: ", showing.period_id)
            else:
                print("Showing already exists: ", showing.period_id)
            """ showing.save() """
            cache.clear()
            return Response({"success": 1})
        except json.JSONDecodeError:
            return Response({"error": -1})
        
        
class RemoveShow(APIView):
    def post(self, request):
        return Response({'left to be implemented': -1})

# EXPECTED REQUEST
# {promotion_code, percent}
class AddPromo(APIView):
    @check_admin
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
    @check_admin
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
class RemovePromo(APIView):
    @check_admin
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                return Response({'error': "Not authorized"})
            
            promotion_code = data.get('promotion_code')
            try:
                promo = Promotions.objects.get(promotion_code=promotion_code)
                promo.delete()
                return Response({"success": "Promotion removed"})
            except Promotions.DoesNotExist:
                return Response({"error": "Promotion not found"})
        except Exception as e:
            return Response({"error": str(e)})

