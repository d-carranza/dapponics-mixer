from django.contrib.auth import authenticate, login, logout
from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
def index(request):
    return HttpResponse("Welcome to Dapponics Mixer")

# TODO store and request user info in the database

# TODO register
# TODO login
# TODO logout