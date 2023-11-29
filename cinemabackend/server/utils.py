from .models import CustomUser, Card
from cryptography.fernet import Fernet
from rest_framework.authtoken.models import Token

#checks if token is associated with the user
def checkToken(user, testToken):
    try:
        token = Token.objects.get(user=user)
        return token.key == testToken
    except Token.DoesNotExist:
        return False

#Saves card to database
class Save_Card():
    def editCard(self, request):
        user = request[0]
        data = request[1]
        cardToEdit = Card.objects.filter()
        #...
        #possibly refactor the encryption 
    def saveCard(self, request):
        key = Fernet.generate_key()
        fern = Fernet(key)
        user = request[0]
        data = request[1]
        cardInfo = [data.get('cardType'), data.get('cardNumber'),  data.get('expirationDate'), data.get('billingStreetAddress'), 
                    data.get('billingCityAddress'), data.get('billingStateAddress)'), data.get('billingZipCodeAddress')]
        for i in range(len(cardInfo)):
            if cardInfo[i] is not None:
                cardInfo[i] = fern.encrypt(cardInfo[i].encode('utf-8'))
            else: 
                raise Exception("Card info not fully received")
        new_card = Card.objects.create(user_id=user, card_type=cardInfo[0], card_number=cardInfo[1], 
                                       card_expiration=cardInfo[2], card_street=cardInfo[3], card_city=cardInfo[4], 
                                       card_state=cardInfo[5], card_zip=cardInfo[6])
        new_card.save()
        return key