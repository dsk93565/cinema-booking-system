from server.models import CustomUser
from django.contrib.auth.hashers import check_password
class EmailAuthBackend:
    def authenticate(self, request, email, password):
        try:
            user = CustomUser.objects.get(email=email)
            if user.check_password(password): 
                return user
            else:
                print("no error but no correct password")
        except:
            return None

