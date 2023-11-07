from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Movies, CustomUser, Card
from .serializer import MovieSerializer, UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
import json
import uuid
from cryptography.fernet import Fernet

#TODO: define error class and error codes and properly throw errors

class Send_Verification_Email(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        subject = 'Cinera Verifcation Code'
        verification_code = data.get('verificationCode')
        email = data.get('email')
        send_mail(subject, verification_code, 'cineraecinemabooking@gmail.com', email)
        return Response({'email sent': 1})


class Save_Card():
    def saveCard(self, request):
        key = Fernet.generate_key()
        fern = Fernet(key)
        user = request[0]
        data = request[1]
        cardType = data.get('cardType')
        cardNumber = data.get('cardNumber')
        expiration = data.get('expirationDate')
        billingStreet = data.get('billingStreetAddress')
        billingCity = data.get('billingCityAddress')
        billingState = data.get('billingStateAddress)')
        billingZip = data.get('billingZipCodeAddress')
        if cardType is not None:
            print("DATA TYPE:", type(cardType))
            cardType = fern.encrypt(cardType.encode('utf-8'))
        if cardNumber is not None:
            cardNumber = fern.encrypt(cardNumber.encode('utf-8'))
        if expiration is not None:
            expiration = fern.encrypt(expiration.encode('utf-8'))
        if billingStreet is not None:
            billingStreet = fern.encrypt(billingStreet.encode('utf-8'))
        if billingCity is not None:
            billingCity = fern.encrypt(billingCity.encode('utf-8'))
        if billingState is not None:
            billingState = fern.encrypt(billingState.encode('utf-8'))
        if billingZip is not None: 
            billingZip = fern.encrypt(billingZip.encode('utf-8'))
        new_card = Card.objects.create(user_id=user, card_type=cardType, card_number=cardNumber, 
                                       card_expiration=expiration, card_city=billingCity, card_street=billingStreet, 
                                       card_state=billingState, card_zip=billingZip)
        new_card.save()
        return Response(key)

#creates user and card in database
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
        new_request = [new_user, data]
        card = Save_Card()
        key = card.saveCard(new_request)
        return Response({"User and Card saved": 1})

class Login(APIView):
    def get(self, request):
        user = authenticate(request, self['username'], self['password'])
        if user is not None:
            login(request, user)
            token, created = Token.objects.get_or_create(user=user)
            return Response(token.key)
        else: 
            return Response(-1)
class MovieList(APIView):
    def get(self, request):
        queryset = Movies.objects.all()
        print("queryset:", queryset)
        serializer_class = MovieSerializer(queryset, many=True)
        print(serializer_class.data)
        movieList = {"movies":serializer_class.data}
        return Response(movieList)
# Create your views here.
