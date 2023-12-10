from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .models import Movies, CustomUser, Card, Periods, Rooms, Showings, Promotions, Seats, Logical_Seats, Bookings, Tickets
from .serializer import MovieSerializer, UserSerializer, ShowingSerializer, PromoSerializer, LogicalSeatSerializer, BookingSerializer
from .backends.auth_by_email import EmailAuthBackend
from django.conf import settings
from .utils import *
import json, random


#expects user_token, shid, cid, promo_code, tickets: tid (can be multiple)
#for tickets
# {
#  "tickets": [1, 2, 3, 4] // tids
#}
#returns bid // booking id
#im already applying the promo percent here but can take that out
class CreateBooking(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user = getUserFromToken(data.get('user_token'))
        show = Showings.objects.get(shid=data.get('shid'))
        
        #may wanna remove this as an initial requirement idk
        card = Card.objects.get(cid=data.get('cid'))
        promo = Promotions.objects.get(promotion_code=data.get('promo_code'))
        tickets_ids = data.get('tickets', [])
        tickets = Tickets.objects.filter(tid__in=tickets_ids)
        price = 0
        for i in tickets:
            price += i.ticket_type_id.price
        if promo is not None:
            price *= (1 - promo.percent)
        booking = Bookings.objects.create(user_id=user, showing_id=show, card_id=card, promotion_id=promo, total=price)
        booking.save()
        for i in tickets:
            i.booking_id = booking
            i.save()
        return Response({'bid': booking.bid})

#expects user_token
#(optional)   start_date, end_date //to filter the bookings
#returns bookings: ['bid', 'user_id', 'showing_id', 'card_id', 'promotion_id', 'total']
class GetBookings(APIView):
    def get(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user = getUserFromToken(data.get('user_token'))
        if user is None:
            return Response({'error': -1})
        bookings = Bookings.objects.filter(user_id=user)
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        shows = []
        if start_date is not None:
            shows = [i.showing_id for i in bookings]
            shows = shows.filter(show_date__range=[start_date, end_date])
            bookings = bookings.filter(showing_id__in=shows)
        serializer = BookingSerializer(bookings, many=True)
        booking_data = {"bookings": bookings.data}
        return Response(booking_data)
        
#expects
# {
#   "tickets": [
#     [ttid, seat_id]
#     [1, 2],
#     [2, 2],
#     [3, 2]
#      ...
#   ]
# }
#ask db (josh) what ttid correspond which ticket types... can make get method but seems extra
#returns tids
#TIDS must be stored in browser somehow if a booking is not created for them yet
class CreateTickets(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        tickets = data.get('tickets', [])
        tids = []
        for i in tickets:
            ttid, seat_id = i
            ticketType = ticketType.object.get(ttid=ttid)
            seat = Seats.objects.get(sid=seat_id)
            new_ticket = Tickets.objects.create(ticket_type_id=ticketType, seat_id=seat)
            logical_seat = Logical_Seats.objects.get(seat_id=seat)
            logical_seat.available = 0
            logical_seat.save()
            new_ticket.save()
            tids.append(new_ticket.tid)
        return Response({'tids': tids})

#expects user_token, bid
class Send_Booking_Email(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user = getUserFromToken(data.get('user_token'))
        email = user.email
        booking = Bookings.objects.get(bid=data.get('bid'))
        show = booking.showing_id
        r
        # can add more info if we want
        email_body = render_to_string('booking_email.html', 
                                      {'total': str(booking.total)})
        subject = 'Cinera Booking for ' + str(show.show_date)
        send_mail(subject, email_body, "ebookingsystemcinera@gmail.com", [email])
        return Response({'email sent': 1})
#might want a json auth token of some sort
class Email_Is_Verified(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        verified_email = data.get('email')
        user_to_verify = CustomUser.objects.get(email=verified_email)
        if user_to_verify is None:
            return Response({"email_verified": -1})
        if int(data.get('verificationCode')) == user_to_verify.verification_code:
            user_to_verify.state_id = 2
            user_to_verify.save()
            print('USER SHOULD BE VERIFIED')
            return Response({'email_verified': 1})
        else:
            return Response({'email_verified': -1})


class Send_Verification_Email(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"email_sent": -2})
        subject = 'Cinera Verifcation Code'
        verification_code = random.randint(10000, 99999)
        email = data.get('email')
        user_to_verify = CustomUser.objects.get(email=email)
        if user_to_verify is None:
            return Response({"email_sent": -1})
        user_to_verify.verification_code = verification_code
        user_to_verify.save()
        send_mail(subject, str(verification_code), "cineraecinemabooking@gmail.com", [email])
        return Response({'email_sent': 1})


#returns {promotions}
class GetPromo(APIView):
    def get(self, request):
        queryset = Promotions.objects.all()
        serializer_class = PromoSerializer(queryset, many=True)
        promoList = {"promotions":serializer_class.data}
        return Response(promoList)

#expects promo_code
#returns percent or wrong_promo
class CheckPromo(APIView):
    def post(self, request):
     try: 
        data = json.loads(request.body.decode('utf-8'))
        promo = Promotions.objects.get(promotion_code=data.get('promo_code'))
        if promo is None:
            return Response({'wrong_promo': -1})
        else: 
            return Response({'percent': promo.percent})
     except json.JSONDecodeError:
        return Response({"error": -1})
    
class SubsribeToPromo(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            email = data.get('email')
            user = CustomUser.objects.get(email=email)
            user.promotions = 1
            user.save()
            return Response({'success': 1})
        except json.JSONDecodeError:
            return Response({"error": -1})

#How this is currently implemented besides Email, pass only the fields that you want to modify
class EditUser(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})

        try:
            user_to_modify = getUserFromToken(data.get('user_token'))
            new_password = data.get('password')
            new_number = data.get('phonenumber')
            new_first = data.get('first_name')
            new_last = data.get('last_name')
            new_promo = data.get('promotions')
            new_street = data.get('shipping_street')
            new_city = data.get('shipping_city')
            new_state = data.get('shipping_state')
            new_zip = data.get('shipping_zip')
            if new_first is not None: 
                user_to_modify.first_name = new_first
            if new_last is not None: 
                user_to_modify.last_name = new_last
            if new_number is not None:
                user_to_modify.phone_number = new_number
            if new_promo is not None:
                user_to_modify.promotions = new_promo
            if new_password is not None:
                # Here you might want to validate the new password
                # and encrypt/hash it before saving
                user_to_modify.password = make_password(new_password)
            if new_street is not None:
                user_to_modify.shipping_street = new_street
            if new_city is not None:
                user_to_modify.shipping_city = new_city
            if new_state is not None:
                user_to_modify.shipping_state = new_state
            if new_zip is not None:
                user_to_modify.shipping_zip = new_zip
            user_to_modify.save()
            return Response({"Success": 1})
        except Exception as e: 
            return Response({"error": str(e)})


class GetUser(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        token_str = data.get('user_token')
        user = getUserFromToken(data.get('user_token'))
        if user is None:
            return Response({'error':-1})
        serializer_class = UserSerializer(user, many=False)
        user_json = {"user":serializer_class.data}
        return Response(user_json)
class Create_User(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        new_username = data.get('username')
        new_email = data.get('email')
        exsisting_users = CustomUser.objects.filter(email=new_email)
        if exsisting_users.exists():
            return Response({"email_is_already_registered": -1})
        new_password = data.get('password')
        new_number = data.get('mobileNumber')
        new_first = data.get('firstName')
        new_last = data.get('lastName')
        new_promo = data.get('optInEmail')
        new_shipping_street = data.get('shippingStreetAddress')
        new_shipping_city = data.get('shippingCityAddress')
        new_shipping_state = data.get('shippingStateAddress')
        new_shipping_zip = data.get('shippingZipCodeAddress')
        new_user = CustomUser.objects.create(username=new_username, email=new_email, 
                                             password=make_password(new_password), 
                                             first_name=new_first, last_name=new_last, 
                                             phone_number=new_number, state_id=1, 
                                             promotions=new_promo, shipping_street=new_shipping_street,
                                             shipping_city=new_shipping_city, shipping_state=new_shipping_state,
                                             shipping_zip=new_shipping_zip)
        
        new_user.save() 
        if data.get('cardNumber') is not None:
            new_request = [new_user, data]
            card = CardActions()
            res = card.saveCard(new_request)
        else: 
            print('did not save card')
        token, created = Token.objects.get_or_create(user=new_user)
        return Response({'user_token': token.key})

class Login(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user_email = data.get('email')
        user_password = data.get('password')
        authenticator_instance = EmailAuthBackend()
        user = authenticator_instance.authenticate(request, email=user_email, password=user_password)
        if user is None:
            return Response({"user_token":-1})
        print(user.state_id)
        if user.state_id != 2: 
            return Response({"user_token":-2})
        token, created = Token.objects.get_or_create(user=user)
        data = {   
            'user_token': token.key,
            'user_type': user.type_id
        }
        return Response(data)
        
# expects user_token
class Logout(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        token = Token.objects.get(key=data.get('user_token'))
        token.delete()
        return ({'success': 1})
class ForgotPassword(APIView):

    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
       
        email = data.get('email')
        try: 
            user_to_recover = CustomUser.objects.get(email=email)
        except: 
            print("could not find user")
            raise Response({'could not find user': -1})
        token, created = Token.objects.get_or_create(user=user_to_recover)
        #refactor for env
        recovery_link = 'localhost:3000/change-password/' + str(user_to_recover.uid) + '/' + str(token.key)
        email_body = render_to_string('recovery_email.html', {'custom_link': recovery_link})
        subject = 'Cinera Recover Password'
        send_mail(subject, email_body, "ebookingsystemcinera@gmail.com", [email])
        return Response({'email sent': 1})


class RecoverCreatePassword(APIView):
    def post(self, request, uid, auth_str):
        user_to_recover = CustomUser.objects.get(uid=uid)
        if not checkToken(user_to_recover, auth_str):
            return Response({"error: could not authenticate": -1})
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user_to_recover.password = make_password(data.get('new_password'))
        user_to_recover.save()
        return Response({'password changed': 200})

class GetCards(APIView):
    def get(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            cardHandler = CardActions()
            cards = cardHandler.getCards(data.get('user_token'))
            return Response(cards)

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
            showings = {'showings': serializer.data}
            return Response(showings)
        except json.JSONDecodeError:
            return Response({"error": -1})

#Currently returns all seats and if they are available or not
#can be changed to 
#expects {shid} (I can change this to be similar to GetShows)
#returns {seats: {['lsid', 'seat_number', 'room_id', 'period_id', 'available']}}
class GetSeats(APIView):
    def get(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
            show = Showings.objects.get(shid=data.get('shid'))
            seats = Seats.objects.filter(room_id=show.room_id)
            logical_seats = Logical_Seats.objects.filter(seat_id__in=seats)
            serializer = LogicalSeatSerializer(logical_seats, many=True)
            seat_data = {'seats': serializer.data}
            return Response(seat_data)
        except json.JSONDecodeError:
            return Response({"error": -1})
class MovieList(APIView):
    def get(self, request):
        queryset = Movies.objects.all()
        serializer_class = MovieSerializer(queryset, many=True)
        movies_data = serializer_class.data

        sorted_movies = {
            'Now Playing': [],
            'Trending': [],
            'Coming Soon': [],
        }

        for movie in queryset:
            state_id = movie.state_id.msid
            serialized_movie = MovieSerializer(movie).data  # Serialize the movie instance
            if state_id == 2:
                sorted_movies['Now Playing'].append(serialized_movie)
            elif state_id == 3:
                sorted_movies['Trending'].append(serialized_movie)
            elif state_id == 4:
                sorted_movies['Coming Soon'].append(serialized_movie)

        return Response(sorted_movies)
    
class Movie(APIView):
    def get(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        queryset = Movies.objects.filter(mid=data.get('mid'))
        serializer_class = MovieSerializer(queryset, many=True)
        movieList = {"movies":serializer_class.data}
        return Response(movieList)

