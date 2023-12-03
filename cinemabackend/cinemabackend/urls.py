"""
URL configuration for cinemabackend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from server import views, admin_views

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/admin/add-movie', admin_views.AddMovie.as_view()),
    path('api/admin/edit-movie', admin_views.EditMovie.as_view()),
    path('api/admin/add-showing', admin_views.AddShow.as_view()),
    path('api/get-movies', views.MovieList.as_view()),
    path('api/get-movie', views.Movie.as_view()),
    path('api/create-user', views.Create_User.as_view()),
    path('api/get-user', views.GetUser.as_view()),
    path('api/get-cards', views.GetCards.as_view()),
    path('api/edit-user', views.EditUser.as_view()),
    path('api/login', views.Login.as_view()),
    path('api/verify-email', views.Send_Verification_Email.as_view()),
    path('api/email-is-verified', views.Email_Is_Verified.as_view()),
    path('api/forgot-password', views.ForgotPassword.as_view()),
    path('api/change-password/<int:uid>/<str:auth_str>', views.RecoverCreatePassword.as_view())
]
