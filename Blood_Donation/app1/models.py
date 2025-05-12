from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import timedelta
from django.utils import timezone
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
import re
# Create your models here.

# Phone number validator
phone_validator = RegexValidator(
    regex=r'^03\d{9}$',
    message='Phone number must be 11 digits and start with 03.'
)

# Gmail-only email validator
def gmail_validator(value):
    if not value.endswith('@gmail.com'):
        raise ValidationError("Only Gmail addresses are allowed.")
    if not value[0].isalnum():
        raise ValidationError("Email should not start with a symbol.")

def strong_password_validator(value):
    if len(value) < 8:
        raise ValidationError("Password must be at least 8 characters long.")
    if not re.search(r'[A-Z]', value):
        raise ValidationError("Password must include at least one uppercase letter.")
    if not re.search(r'[a-z]', value):
        raise ValidationError("Password must include at least one lowercase letter.")
    if not re.search(r'\d', value):
        raise ValidationError("Password must include at least one number.")
    if not re.search(r'[@$!%*#?&]', value):
        raise ValidationError("Password must include at least one special character (@$!%*#?&).")
    if value.lower() in ['password', '12345678', 'admin', 'hospital123']:
        raise ValidationError("This password is too common.")

#choices
STATUS_CHOICES = [
    ('active', 'Active'),
    ('inactive', 'Inactive'),
]
GENDER_CHOICES = [
    ('male', 'Male'),
    ('female', 'Female'),
    ('other', 'Other'),
]
REQUEST_TYPE_CHOICES = [
    ('buying', 'Buying'),
    ('exchange_request', 'Exchange Request'),
]
REQUESTING_STATUS_CHOICES = [
    ('pending_verification', 'Pending Verification'),
    ('approved', 'Approved'),
    ('rejected', 'Rejected'),
    ('in_transit', 'In-Transit'),
    ('completed', 'Completed'),
]
BLOOD_TYPE_CHOICES = [
    ('A+', 'A+'),
    ('A-', 'A-'),
    ('B+', 'B+'),
    ('B-', 'B-'),
    ('AB+', 'AB+'),
    ('AB-', 'AB-'),
    ('O+', 'O+'),
    ('O-', 'O-'),
    ('O', 'O'),  # Sometimes O type is used as O without +/-
]
BLOOD_COMPONENT_CHOICES = [
    ('Whole Blood', 'Whole Blood'),
    ('Plasma', 'Plasma'),
    ('Platelets', 'Platelets'),
    ('Red Blood Cells', 'Red Blood Cells'),
    ('Cryoprecipitate', 'Cryoprecipitate'),
]
DEPOSIT_STATUS_CHOICES = [
    ('Pending', 'Pending'),
    ('Forfeited', 'Forfeited'),
    ('Refunded', 'Refunded'),
]
STATUSB_CHOICES = [
        ('Active', 'Active'),
        ('Expired', 'Expired'),
]
# Predefined shelf life for each blood component in days
COMPONENT_SHELF_LIFE = {
    'Whole Blood': 42,  # 42 days for Whole Blood
    'Plasma': 365,  # 1 year for Plasma
    'Platelets': 5,  # 5 days for Platelets
    'Red Blood Cells': 42,  # 42 days for Red Blood Cells
    'Cryoprecipitate': 365,  # 1 year for Cryoprecipitate
}


class User(AbstractUser):
    username = models.CharField(max_length=20, unique=True)  # hospital_license
    email = models.EmailField(unique=True,validators=[gmail_validator])
    
    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']

    @property
    def profile(self):
       return HospitalProfile.objects.get(user=self)

    @property
    def license_image(self):
        try:
            # Accessing the license through the profile of the user
            return self.profile.license.image.url if self.profile and self.profile.license and self.profile.license.image else None
        except:
            return None

#    @property
#    def profile(self):
#        return getattr(self, 'hospitalprofile', None)

class HospitalProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    address = models.CharField(max_length=200)
    postal_code = models.IntegerField(null=True)
    phone = models.CharField(max_length=11, validators=[phone_validator])
    operating_hours = models.IntegerField(null=True)
    status = models.CharField(
        max_length=8,
        choices=STATUS_CHOICES,
        default='Active'
    )
    verified = models.BooleanField(default=False)


class ValidLicense(models.Model):
    license_number = models.CharField(max_length=20, unique=True)
    image = models.ImageField(upload_to='hospital_licenses/', blank=True, null=True)  # ✅ This will store images in media/hospital_licenses/


    def __str__(self):
        return self.license_number

   