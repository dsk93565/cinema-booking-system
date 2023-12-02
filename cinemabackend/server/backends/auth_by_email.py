from server.models import CustomUser
from django.contrib.auth.hashers import check_password
class EmailAuthBackend:
    def authenticate(self, request, email, password):
        try:
            user = CustomUser.objects.get(email=email)
            if user.check_password(password): 
            # this is not working... if it turns out the password weren't being hashed then come back to this
            # if user.check_password(password):
            #     print("PlEASEEEEE")
                return user
            else:
                print("no error but no correct password")
        except:
            return None

