from .models import Card
from cryptography.fernet import Fernet

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