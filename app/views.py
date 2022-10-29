from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render

from .models import User


def index(request):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "app/mixer.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))


@login_required
def save(request):

    # TODO store and request user info in the database
    return HttpResponseRedirect(reverse("login"))


def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            return HttpResponseRedirect(reverse("index"))
        else:
            return render(request, "app/login.html", {
                "message": "Invalid username and/or password."
            })
    else:
        return render(request, "app/login.html")

def logout_view(request):
    logout(request)
    return HttpResponseRedirect(reverse("index"))
    
def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            return render(request, "app/register.html", {
                "message": "Passwords must match."
            })

        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            return render(request, "app/register.html", {
                "message": "Username already taken."
            })
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    else:
        return render(request, "app/register.html")



    # traits = {
    #     {
    #         "type": "left",
    #         "value": "pink",
    #         "rarity": "60",
    #         "image": "???",
    #     },
    #     {
    #         "type": "left",
    #         "value": "green",
    #         "rarity": "40",
    #         "image": "???",
    #     },
    #     {
    #         "type": "right",
    #         "value": "blue",
    #         "rarity": "60",
    #         "image": "???",
    #     },
    #     {
    #         "type": "right",
    #         "value": "yellow",
    #         "rarity": "40",
    #         "image": "???",
    #     }
    # }