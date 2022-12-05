from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    pass

class Trait(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=30, blank=True, null=True)
    value = models.CharField(max_length=30, blank=True, null=True)
    rarity = models.IntegerField(blank=True, null=True, default=0)
    img = models.URLField(max_length=200, blank=True, null=True)