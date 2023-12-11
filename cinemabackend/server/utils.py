from .models import CustomUser, Card, Encryption_Keys, Movies, Showings
from cryptography.fernet import Fernet
from rest_framework.authtoken.models import Token
from functools import wraps
from rest_framework.views import APIView
import json

# DECORATOR for checking if admin
def check_admin(view_func):
    @wraps(view_func)
    def wrapper(self, request, *args, **kwargs):
        data = json.loads(request.body.decode('utf-8'))
        inner_data = data['body']
        data = json.loads(data['body'])
        token_str = data.get('user_token')
        user = getUserFromToken(token_str)
        if user is not None and user.type_id == 2:
            return view_func(self, request, *args, **kwargs)
        else:
            raise Exception({"could not verify admin": -1})
    return wrapper

def checkAdmin(token_str):
    user = getUserFromToken(token_str)
    if user is not None and user.type_id == 2:
        return user
    else:
        return None

def getUserFromToken(token_str):
    try: 
        token = Token.objects.get(key=token_str)
        return token.user
    except:
        return None

#checks if token is associated with the user
def checkToken(user, testToken):
    try:
        token = Token.objects.get(user=user)
        return token.key == testToken
    except Token.DoesNotExist:
        return False

def getShowObjects(request):
    try: 
        print(request.body.decode('utf-8'))
        data = json.loads(request.body.decode('utf-8'))
        print("HERE: ", data.get('mid'))
        movie = Movies.objects.get(mid=data.get('mid'))
        print("HERE2", movie)
        query = Showings.objects.filter(movie_id=movie)
        print("query ", query)
        start_date = data.get('start_date')
        end_date = data.get('end_date')
        if start_date and end_date is not None:
            print("???")
            query = query.filter(show_date__range=[start_date, end_date])
        if query:
            print("HERE3", query)
            return query
        else:
            return None
    except json.JSONDecodeError:
        raise Exception({"error: could not decode json object": -5})

class CardActions():
    def getCards(self, request):
        user = getUserFromToken(request[0])
        cards = Card.objects.filter(user_id=user)
        if cards is None:
            raise Exception('No cards')
        key = Encryption_Keys.objects.get(user_id=user)
        fern = Fernet(key)
        data = {
            'cards': {}
        }
        for i in cards:
            cid = cards[i].cid
            data['cards'][cid] = {}
            data['cards'][cid]['card_type'] = fern.decrypt(cards[i].card_type)
            data['cards'][cid]['last_four'] = fern.decrypt(cards[i].card_number)[-4:]
            data['cards'][cid]['card_street_address'] = fern.decrypt(cards[i].card_street)
            data['cards'][cid]['card_city_address'] = fern.decrypt(cards[i].card_city)
            data['cards'][cid]['card_state_address'] = fern.decrypt(cards[i].card_state)
            data['cards'][cid]['card_zip'] = fern.decrypt(cards[i].card_zip)
        return data

        #should prolly refactor the encryption 
    def saveCard(self, request):
        key = Fernet.generate_key()
        fern = Fernet(key)
        user = request[0]
        data = request[1]
        print(data)
        print('cp1')
        cardUnencryptedInfo = [data.get('cardType'), data.get('cardNumber'),  data.get('expirationDate'), data.get('billingStreetAddress'), 
                    data.get('billingCityAddress'), str(data.get('billingStateAddress)')), data.get('billingZipCodeAddress')]
        cardInfo = []
        for i in cardUnencryptedInfo:
            tmp = i.encode('utf-8')
            encrypted = fern.encrypt(tmp)
            cardInfo.append(encrypted)
        try:
            new_card = Card.objects.create(user_id=user, card_type=cardInfo[0], card_number=cardInfo[1], 
                                           card_expiration=cardInfo[2], card_street=cardInfo[3], card_city=cardInfo[4], 
                                           card_state=cardInfo[5], card_zip=cardInfo[6])
            
            new_card.save()
        except: 
            raise Exception({'could not save card': -1})
        key_storage = Encryption_Keys.objects.get_or_create(encryption_key=key, user_id=user)
        key_storage.save() 
        return 1