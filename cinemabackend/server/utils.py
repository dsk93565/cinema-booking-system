from .models import CustomUser, Card, Encryption_Keys
from cryptography.fernet import Fernet
from rest_framework.authtoken.models import Token

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

class CardActions():
    def getCards(self, request):
        user = getUserFromToken(request[0])
        cards = Card.objects.filter(user_id=user)
        if cards is None:
            raise Exception("No cards")
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