from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from .models import Movies, CustomUser, Card
from .serializer import MovieSerializer, UserSerializer
from django.conf import settings
from .utils import *
import json, random


#TODO: define error class and error codes and properly throw errors

#might want a json auth token of some sort
class Email_Is_Verified(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        verified_email = data.get('email')
        user_to_verify = CustomUser.objects.filter(email=verified_email)[0]
        if user_to_verify is None:
            return Response({"error: user not found": -1})
        if data.get('verificationCode') == user_to_verify.verification_code:
            user_to_verify.state_id = 2
            user_to_verify.save()
            return Response({'email verified': 200})
        else:
            return Response({'wrong code': -1})


class Send_Verification_Email(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        subject = 'Cinera Verifcation Code'
        verification_code = random.randint(10000, 99999)
        email = data.get('email')
        user_to_verify = CustomUser.objects.filter(email=email)[0]
        if user_to_verify is None:
            return Response({"error: user not found": -1})
        user_to_verify.verification_code = verification_code
        user_to_verify.save()
        send_mail(subject, str(verification_code), "cineraecinemabooking@gmail.com", [email])
        return Response({'email sent': 1})


#How this is currently implemented besides Email, pass only the fields that you want to modify
#Need a way to distinguish which card is being edited!
class Edit_User(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user_email = data.get('email')
        user_to_modify = CustomUser.objects.filter(email=user_email)[0]
        if user_to_modify is None:
            return Response({"error: user not found": -1})
        new_password = data.get('password')
        new_number = data.get('mobileNumber')
        new_first = data.get('firstName')
        new_last = data.get('lastName')
        if new_password is not None:
            user_to_modify.password = new_password
        if new_number is not None:
            user_to_modify.phone_number = new_number
        if new_first is not None: 
            user_to_modify.first_name = new_first
        if new_last is not None: 
            user_to_modify.last_name = new_last
        user_to_modify.save()

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
            return Response({"error: email is already registered to an exsisting user": -1})
        new_password = data.get('password')
        new_number = data.get('mobileNumber')
        new_first = data.get('firstName')
        new_last = data.get('lastName')
        new_user = CustomUser.objects.create(username=new_username, email=new_email, password=make_password(new_password), 
                                             first_name=new_first, last_name=new_last, phone_number=new_number, state_id=1)
        new_user.save()
        if data.get('cardNumber') is not None:
            new_request = [new_user, data]
            card = Save_Card()
            key = card.saveCard(new_request)
        token, created = Token.objects.get_or_create(user=new_user)
        return Response(token.key)

class Login(APIView):
    def post(self, request):
        user = authenticate(request.data.get['email'], request.data.get['password'])
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response(token.key)
        else: 
            return Response(-1)
class MovieList(APIView):
    def get(self, request):
        queryset = Movies.objects.all()
        print("queryset:", queryset)
        serializer_class = MovieSerializer(queryset, many=True)
        movieList = {"movies":serializer_class.data}
        return Response(movieList)
    
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

