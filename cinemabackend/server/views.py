from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .models import Movies, CustomUser
from .serializer import MovieSerializer, UserSerializer
from django.contrib.auth.hashers import make_password
from django.contrib.auth import authenticate, login
import json

#TODO: define error class and error codes and properly throw errors
class Create_User(APIView):
    def post(self, request):
        new_username = self['username']
        new_email = self['email']
        new_password = self['password']
        new_password2 = self['confirm_password']

        exsisting_users = CustomUser.objects.filter(username=new_username)
        if exsisting_users.exists():
            return Response({"error: username is already registered to an exsisting user": -1})
        exsisting_users = CustomUser.objects.filter(email=new_email)
        if exsisting_users.exists():
            return Response({"error: email is already registered to an exsisting user": -1})
        if (new_password != new_password2):
            return Response({"error: passwords do not match": -2})
        new_user = CustomUser.objects.create(username=new_username, email=new_email, password=make_password(new_password))
        new_user.save()
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
        return Response(serializer_class.data)
# Create your views here.
