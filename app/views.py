import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import User, Trait


def index(request, *args, **kwargs):

    # Authenticated users view their inbox
    if request.user.is_authenticated:
        return render(request, "app/mixer.html")

    # Everyone else is prompted to sign in
    else:
        return HttpResponseRedirect(reverse("login"))

@csrf_exempt
@login_required
def save(request):

    # Get user
    user = request.user
 
    # Saving traits must be done via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    if request.method == "POST":
        
        # Parse received data
        collection = (json.loads(request.body))
        attributes = collection["attributes"]

        # Delete previous user's traits in the database
        alltraits = Trait.objects.all()
        for trait in alltraits:
            if trait.user == user:
                trait.delete()

        # Save new user's traits in the database
        for attribute in attributes:
            type = attribute["trait_type"]
            for trait in attribute["traits"]:
                value = trait["value"]
                rarity = trait["rarity"]
                img = trait["img"]

                newtrait = Trait(
                    user=user,
                    type=type,
                    value=value,
                    rarity=rarity,
                    img=img
                )
                newtrait.save()
        print("New input saved")
        
        return JsonResponse({"message": "Traits saved successfully."}, status=201)
   
    return HttpResponseRedirect(reverse("login"))

@csrf_exempt
@login_required
def storedtraits(request): 
    
    # Get user traits
    user = request.user
    print("user", user)

    # Create empty object
    storedtraits = {}

    # Add traits to the object if any
    usertraits = Trait.objects.filter(user=user)
    if usertraits != None:

        # Make a list with all the unique types
        usertypes = []
        for trait in usertraits:
            if trait.type not in usertypes:
                usertypes.append(trait.type)
        
        # For each trait create an object 
        attributes= []
        for type in usertypes:
            attribute = {}
            attribute["trait_type"] = type
            attribute["traits"] = []

            # Store the traits grouped by type
            typetraits = Trait.objects.filter(user=user, type=type)
            for trait in typetraits:
                traitobject = {}

                # Create a trait object
                if trait.type == type:
                    traitobject["img"] = trait.img
                    traitobject["value"] = trait.value
                    traitobject["rarity"] = trait.rarity

                # Append traits to attributes
                attribute["traits"].append(traitobject)
            attributes.append(attribute)
        # Append attributes to storedtraits and set supply to ""
        storedtraits["attributes"] = attributes
        storedtraits["supply"] = ""

    # Default response if 0 traits are stored
    if len(usertraits) == 0:
        storedtraits["attributes"] = [
            {
                "trait_type": "",
                "traits": [
                {
                    "img": "",
                    "value": "",
                    "rarity": "",
                },
                ],
            },
        ]
        storedtraits["supply"] = ""

    print("Object fetched")

    # Returns parsed JSON
    jsonstate = json.dumps(storedtraits)
    return JsonResponse(jsonstate, safe=False, status=201)

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



