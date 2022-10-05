from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    pass

# TODO create new tables to store relevant info about the user's collection

# class Traits(models.Model):
#     collection = models.ForeignKey(User, )
#     
#     supply = models.IntegerField()
#     traits = models.ForeignKey(Trait, )
#     tokent = models.ForeignKey(Token, )
#     metain = models.JSONField(noice, )
#     metaout = models.JSONField(noice, )