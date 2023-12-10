from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from django.contrib.auth.hashers import make_password
from .backends.auth_by_email import EmailAuthBackend
from .utils import *
from .models import (
    Promotions,
    Tickets,
    Bookings,
    Logical_Seats,
    Seats
)
import json, random
from .serializer import UserSerializer

# might want a json auth token of some sort
class Email_Is_Verified(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        verified_email = data.get("email")
        user_to_verify = CustomUser.objects.get(email=verified_email)
        if user_to_verify is None:
            return Response({"email_verified": -1})
        if int(data.get("verificationCode")) == user_to_verify.verification_code:
            user_to_verify.state_id = 2
            user_to_verify.save()
            print("USER SHOULD BE VERIFIED")
            return Response({"email_verified": 1})
        else:
            return Response({"email_verified": -1})


class Send_Verification_Email(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"email_sent": -2})
        subject = "Cinera Verifcation Code"
        verification_code = random.randint(10000, 99999)
        email = data.get("email")
        user_to_verify = CustomUser.objects.get(email=email)
        if user_to_verify is None:
            return Response({"email_sent": -1})
        user_to_verify.verification_code = verification_code
        user_to_verify.save()
        send_mail(
            subject, str(verification_code), "cineraecinemabooking@gmail.com", [email]
        )
        return Response({"email_sent": 1})

class SubsribeToPromo(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
            email = data.get("email")
            user = CustomUser.objects.get(email=email)
            user.promotions = 1
            user.save()
            return Response({"success": 1})
        except json.JSONDecodeError:
            return Response({"error": -1})


#besides Email, pass only the fields that you want to modify
class EditUser(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        try:
            user_to_modify = getUserFromToken(data.get("user_token"))
            serializer = UserSerializer(data=data)
            # fields_to_update = {
            #     "first_name": "first_name",
            #     "last_name": "last_name",
            #     "phonenumber": "phone_number",
            #     "promotions": "promotions",
            #     "password": "password",
            #     "shipping_street": "shipping_street",
            #     "shipping_city": "shipping_city",
            #     "shipping_state": "shipping_state",
            #     "shipping_zip": "shipping_zip",
            # }
            for key, value in serializer.fields.items():
                new_value = data.get(key)
                if new_value is not None:
                    if key == 'password':
                        setattr(user_to_modify, value, make_password(new_value))
                    else:
                        setattr(user_to_modify, value, new_value)
            user_to_modify.save()
            return Response({"Success": 1})
        except Exception as e:
            return Response({"error": str(e)})


class GetUser(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        token_str = data.get("user_token")
        user = getUserFromToken(data.get("user_token"))
        if user is None:
            return Response({"error": -1})
        serializer_class = UserSerializer(user, many=False)
        user_json = {"user": serializer_class.data}
        return Response(user_json)


class Create_User(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        new_username = data.get("username")
        new_email = data.get("email")
        exsisting_users = CustomUser.objects.filter(email=new_email)
        if exsisting_users.exists():
            return Response({"email_is_already_registered": -1})
        fields = {
            'username': data.get("username"),
            'email': data.get("email"),
            'password': make_password(data.get("password")),
            'first_name': data.get("firstName"),
            'last_name': data.get("lastName"),
            'phone_number': data.get("mobileNumber"),
            'state_id': 1,
            'promotions': data.get("optInEmail"),
            'shipping_street': data.get("shippingStreetAddress"),
            'shipping_city': data.get("shippingCityAddress"),
            'shipping_state': data.get("shippingStateAddress"),
            'shipping_zip': data.get("shippingZipCodeAddress"),
        }
        new_user = CustomUser.objects.create(**fields)
        new_user.save()
        if data.get("cardNumber") is not None:
            new_request = [new_user, data]
            card = CardActions()
            res = card.saveCard(new_request)
        else:
            print("did not save card")
        token, created = Token.objects.get_or_create(user=new_user)
        return Response({"user_token": token.key})


class Login(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user_email = data.get("email")
        user_password = data.get("password")
        authenticator_instance = EmailAuthBackend()
        user = authenticator_instance.authenticate(
            request, email=user_email, password=user_password
        )
        if user is None:
            return Response({"user_token": -1})
        print(user.state_id)
        if user.state_id != 2:
            return Response({"user_token": -2})
        token, created = Token.objects.get_or_create(user=user)
        data = {"user_token": token.key, "user_type": user.type_id}
        return Response(data)


# expects user_token
class Logout(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        token = Token.objects.get(key=data.get("user_token"))
        token.delete()
        return {"success": 1}


class ForgotPassword(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})

        email = data.get("email")
        try:
            user_to_recover = CustomUser.objects.get(email=email)
        except:
            print("could not find user")
            raise Response({"could not find user": -1})
        token, created = Token.objects.get_or_create(user=user_to_recover)
        # refactor for env
        recovery_link = (
            "localhost:3000/change-password/"
            + str(user_to_recover.uid)
            + "/"
            + str(token.key)
        )
        email_body = render_to_string(
            "recovery_email.html", {"custom_link": recovery_link}
        )
        subject = "Cinera Recover Password"
        send_mail(subject, email_body, "ebookingsystemcinera@gmail.com", [email])
        return Response({"email sent": 1})


class RecoverCreatePassword(APIView):
    def post(self, request, uid, auth_str):
        user_to_recover = CustomUser.objects.get(uid=uid)
        if not checkToken(user_to_recover, auth_str):
            return Response({"error: could not authenticate": -1})
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user_to_recover.password = make_password(data.get("new_password"))
        user_to_recover.save()
        return Response({"password changed": 200})

class GetCards(APIView):
    def get(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            cardHandler = CardActions()
            cards = cardHandler.getCards(data.get("user_token"))
            return Response(cards)

