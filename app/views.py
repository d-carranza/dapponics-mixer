import json
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.db import IntegrityError
from django.http import JsonResponse, HttpResponse, HttpResponseRedirect
from django.urls import reverse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from .models import User


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


    # Saving traits must be done via POST
    if request.method != "POST":
        return JsonResponse({"error": "POST request required."}, status=400)

    if request.method == "POST":
        # Check received data
        data = json.loads(request.body)
        print(data)

        # TODO Extract user & data values and if not ok send errors (these errors should be displayed in te app later)


        # TODO Else, introduce the values in the database in order usin for each loops
# ---------------------------------------------------------------------------------
# # def compose(request):

# #     # Composing a new email must be via POST
# #     if request.method != "POST":
# #         return JsonResponse({"error": "POST request required."}, status=400)

# #     # Check recipient emails
# #     data = json.loads(request.body)
#     emails = [email.strip() for email in data.get("recipients").split(",")]
#     if emails == [""]:
#         return JsonResponse({
#             "error": "At least one recipient required."
#         }, status=400)

#     # Convert email addresses to users
#     recipients = []
#     for email in emails:
#         try:
#             user = User.objects.get(email=email)
#             recipients.append(user)
#         except User.DoesNotExist:
#             return JsonResponse({
#                 "error": f"User with email {email} does not exist."
#             }, status=400)

#     # Get contents of email
#     subject = data.get("subject", "")
#     body = data.get("body", "")

#     # Create one email for each recipient, plus sender
#     users = set()
#     users.add(request.user)
#     users.update(recipients)
#     for user in users:
#         email = Email(
#             user=user,
#             sender=request.user,
#             subject=subject,
#             body=body,
#             read=user == request.user
#         )
#         email.save()
#         for recipient in recipients:
#             email.recipients.add(recipient)
#         email.save()
# ---------------------------------------------------------------------------------

        return JsonResponse({"message": "Traits sent successfully."}, status=201)
   

   
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



