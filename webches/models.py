from django.db import models
from django.contrib.auth.models import AbstractUser
from phonenumber_field.modelfields import PhoneNumberField
# Create your models here.


class Category(models.Model):
    cat_name = models.CharField(max_length=200)
    detail = models.TextField()

    def __str__(self):
        return self.cat_name


class Referrals(models.Model):
    name = models.CharField(max_length=300)
    url = models.CharField(max_length=2000)
    info = models.TextField(blank=True)

    def __str__(self):
        return self.name



class Disease(models.Model):
    Disease_Name = models.CharField(max_length=200)
    details = models.TextField()
    symptoms = models.TextField()
    image = models.ImageField()
    published = 'p'
    draft = 'd'
    status_choices = ((published,'published'),(draft,'draft'))
    status = models.CharField(max_length=1, choices=status_choices, default=draft)
    solutions = models.TextField()
    Disease_Category = models.ForeignKey(Category, on_delete=models.CASCADE)
    referrals = models.CharField(max_length=3000, blank=True)
    botanical_name = models.CharField(max_length=200, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.Disease_Name


class User(AbstractUser):
    website = models.URLField(blank=True)
    phone_number = PhoneNumberField(blank=True)
    picture = models.ImageField(blank=True)
    bio = models.CharField(max_length=300)


class Contact(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()
    subject = models.CharField(max_length=200, blank=True)
    message = models.TextField()
    date_sent = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.message
