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
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"})

        user_token = data.get('user_token')
        if checkAdmin(user_token) is None:
            return Response({'error': "User is not authorized or not an admin"})

        queryset = CustomUser.objects.all()
        serializer = self.get_serializer(queryset, many=True)
        userList = {"users": serializer.data}
        return Response(userList)

class MakeAdmin(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"})

        user_token = data.get('user_token')
        if checkAdmin(user_token) is None:
            return Response({'error': "User is not authorized or not an admin"})

        user_id = data.get('uid')
        try:
            user = CustomUser.objects.get(pk=user_id)
            user.type_id = 2  # Setting type_id to 2 to make the user an admin
            user.save()
            return Response({"success": 1})
        except CustomUser.DoesNotExist:
            return Response({"error": "User not found"})
        except Exception as e:
            return Response({"error": str(e)})

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

class EditUser(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error": "Invalid JSON format"})

        user_token = data.get('user_token')
        if checkAdmin(user_token) is None:
            return Response({'error': "User is not authorized or not an admin"})

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
            user = checkAdmin(user_token)
            if user is None:
                return Response({'error': -1})
            movie = Movies.objects.get(mid=data.get('mid'))
            if user is None or user.type_id != 2 or movie is None:
                return Response({"error:"-1})
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

# EXPECTED REQUEST
# {user_token, mid, pid, rid}
class AddShow(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            user_token = data.get('user_token')
            if checkAdmin(user_token) is None:
                print("No token")
                return Response({'error': -1})
            period = Periods.objects.get(pid=data.get('pid'))
            movie = Movies.objects.get(mid=data.get('mid'))
            room = Rooms.objects.get(rid=data.get('rid'))
            print(room)
            seats = Seats.objects.filter(room_id=room)
            print("room seats", seats)
            for i in range(room.seatsInRoom):
                seat = seats.filter(seat_number=i)
                print("seat: ",seat)
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
        
class RemovePromo(APIView):
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

        
