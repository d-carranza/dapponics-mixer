from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator


class User(AbstractUser):
    pass

class Trait(models.Model): 
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    type = models.CharField(max_length=30)
    value = models.CharField(max_length=30)
    rarity = models.IntegerField(validators=[MaxValueValidator(100), MinValueValidator(1)])
    img = models.ImageField(upload_to="images", blank=True)