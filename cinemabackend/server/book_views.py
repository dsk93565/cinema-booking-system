from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from django.core.mail import send_mail
from django.template.loader import render_to_string
from .utils import *
from .models import (
    Promotions,
    Tickets,
    Bookings,
    Logical_Seats,
    Seats
)
from .serializer import BookingSerializer, LogicalSeatSerializer

# expects user_token, shid, cid, promo_code, tickets: tid (can be multiple)
# for tickets
# {
#  "tickets": [1, 2, 3, 4] // tids
# }
# returns bid // booking id
# im already applying the promo percent here but can take that out
class CreateBooking(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user = getUserFromToken(data.get("user_token"))
        show = Showings.objects.get(shid=data.get("shid"))

        # may wanna remove this as an initial requirement idk
        card = Card.objects.get(cid=data.get("cid"))
        promo = Promotions.objects.get(promotion_code=data.get("promo_code"))
        tickets_ids = data.get("tickets", [])
        tickets = Tickets.objects.filter(tid__in=tickets_ids)
        price = 0
        for i in tickets:
            price += i.ticket_type_id.price
        if promo is not None:
            price *= 1 - promo.percent
        booking = Bookings.objects.create(
            user_id=user, showing_id=show, card_id=card, promotion_id=promo, total=price
        )
        booking.save()
        for i in tickets:
            i.booking_id = booking
            i.save()
        return Response({"bid": booking.bid})


# expects user_token
# (optional)   start_date, end_date //to filter the bookings
# returns bookings: ['bid', 'user_id', 'showing_id', 'card_id', 'promotion_id', 'total']
class GetBookings(APIView):
    def get(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user = getUserFromToken(data.get("user_token"))
        if user is None:
            return Response({"error": -1})
        bookings = Bookings.objects.filter(user_id=user)
        start_date = data.get("start_date")
        end_date = data.get("end_date")
        shows = []
        if start_date is not None:
            shows = [i.showing_id for i in bookings]
            shows = shows.filter(show_date__range=[start_date, end_date])
            bookings = bookings.filter(showing_id__in=shows)
        serializer = BookingSerializer(bookings, many=True)
        booking_data = {"bookings": bookings.data}
        return Response(booking_data)


# expects
# {
#   "tickets": [
#     [ttid, seat_id]
#     [1, 2],
#     [2, 2],
#     [3, 2]
#      ...
#   ]
# }
# ask db (josh) what ttid correspond which ticket types... can make get method but seems extra
# returns tids
# TIDS must be stored in browser somehow if a booking is not created for them yet
class CreateTickets(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        tickets = data.get("tickets", [])
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
        return Response({"tids": tids})

# Currently returns all seats and if they are available or not
# can be changed to
# expects {shid} (I can change this to be similar to GetShows)
# returns {seats: {['lsid', 'seat_number', 'room_id', 'period_id', 'available']}}
class GetSeats(APIView):
    def get(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
            show = Showings.objects.get(shid=data.get("shid"))
            seats = Seats.objects.filter(room_id=show.room_id)
            logical_seats = Logical_Seats.objects.filter(seat_id__in=seats)
            serializer = LogicalSeatSerializer(logical_seats, many=True)
            seat_data = {"seats": serializer.data}
            return Response(seat_data)
        except json.JSONDecodeError:
            return Response({"error": -1})


# expects user_token, bid
class Send_Booking_Email(APIView):
    def post(self, request):
        try:
            data = json.loads(request.body.decode("utf-8"))
        except json.JSONDecodeError:
            return Response({"error: could not decode json object": -5})
        user = getUserFromToken(data.get("user_token"))
        email = user.email
        booking = Bookings.objects.get(bid=data.get("bid"))
        show = booking.showing_id
        r
        # can add more info if we want
        email_body = render_to_string(
            "booking_email.html", {"total": str(booking.total)}
        )
        subject = "Cinera Booking for " + str(show.show_date)
        send_mail(subject, email_body, "ebookingsystemcinera@gmail.com", [email])
        return Response({"email sent": 1})
