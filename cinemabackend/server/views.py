from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .models import Movies, CustomUser, Card
from .serializer import MovieSerializer, UserSerializer
from .backends.auth_by_email import EmailAuthBackend
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


#How this is currently implemented besides Email, pass only the fields that you want to modify
#Need a way to distinguish which card is being edited!
class EditUser(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user_email = data.get('email')
        print(data)
        try:
            user_to_modify = CustomUser.objects.get(email=user_email)
        except: 
            return Response({"error":-1})
        #CAN BE REFACTORED WITH SERIALIZER
        new_password = data.get('password')
        new_number = data.get('phonenumber')
        new_first = data.get('first_name')
        new_last = data.get('last_name')
        new_promo = data.get('promotions')
        if new_password is not None:
            user_to_modify.password = new_password
        if new_number is not None:
            user_to_modify.phone_number = new_number
        if new_first is not None: 
            user_to_modify.first_name = new_first
        if new_last is not None: 
            user_to_modify.last_name = new_last
        if new_promo is not None:
            user_to_modify.promotions = new_promo
        user_to_modify.save()
        return Response({"Success": 1})

class GetUser(APIView):
    def post(self, request):
        try: 
            data = json.loads(request.body.decode('utf-8'))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        token_str = data.get('user_token')
        try: 
            token = Token.objects.get(key=token_str)
            user = token.user
            serializer_class = UserSerializer(user, many=False)
            user_json = {"user":serializer_class.data}
            return Response(user_json)
        except:
            return Response({"error cold not find token": -1})

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
        new_promo = data.get('promotions')

        new_user = CustomUser.objects.create(username=new_username, email=new_email, password=make_password(new_password), 
                                             first_name=new_first, last_name=new_last, phone_number=new_number, state_id=1, promotions=new_promo)
        
        new_user.save()
        try: 
            if data.get('cardNumber') is not None:
                new_request = [new_user, data]
                card = Save_Card()
                key = card.saveCard(new_request)
        except:
            print('could not save card')
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

