from django.contrib.auth import get_user_model
class EmailAuthBackend:
    def authenticate(self, request, email, password):
        User = get_user_model()
        try:
            user = User.objects.get(email=email)
            if user.check_password(password):
                return user
        except User.DoesNotExist:
            return None

