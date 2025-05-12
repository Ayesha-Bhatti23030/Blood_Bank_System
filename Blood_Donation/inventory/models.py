from django.db import models
from datetime import timedelta
from django.utils import timezone
import uuid
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from app1.models import phone_validator,gmail_validator,strong_password_validator,HospitalProfile,User,COMPONENT_SHELF_LIFE,STATUSB_CHOICES,GENDER_CHOICES,REQUEST_TYPE_CHOICES,REQUESTING_STATUS_CHOICES,BLOOD_TYPE_CHOICES ,BLOOD_COMPONENT_CHOICES,DEPOSIT_STATUS_CHOICES,STATUS_CHOICES
import re
from django.contrib.auth import get_user_model
User = get_user_model()


class Attendant(models.Model):
    cnic=models.CharField(max_length=15, primary_key=True)
    name=models.CharField(max_length=100)
    contact = models.CharField(max_length=11, validators=[phone_validator])
    email = models.EmailField(max_length=100, validators=[gmail_validator])
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # 👈 Link to logged-in user


class Donor(models.Model):
    cnic = models.CharField(max_length=15, primary_key=True)
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    gender = models.CharField(
        max_length=6,  # "other" is the longest, so 6 is enough
        choices=GENDER_CHOICES,
        default='other',
    )
    weight=models.IntegerField()
    history_of_disease=models.CharField(max_length=200,default='none')
    medication=models.CharField(max_length=200,default='none')
    user = models.ForeignKey(User, on_delete=models.CASCADE)  # 👈 Link to logged-in user
  
    def __str__(self):
        return self.name

def generate_uuid_str():
    return str(uuid.uuid4())

class BloodStock(models.Model):
    unique_identifier = models.CharField(
        max_length=100, 
        default=generate_uuid_str,
        editable=False, 
        unique=True, 
        primary_key=True
    )
    donor_cnic = models.ForeignKey(Donor, on_delete=models.CASCADE)
    hospital_license = models.ForeignKey('app1.HospitalProfile', on_delete=models.CASCADE, related_name='blood_inventory')
    user = models.ForeignKey(User, on_delete=models.CASCADE)
  
    blood_group = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES, default='O+')
    blood_test_result = models.CharField(max_length=100)
    storage_location = models.CharField(max_length=100)
    price = models.IntegerField()
    blood_component = models.CharField(max_length=20, choices=BLOOD_COMPONENT_CHOICES, default='Whole Blood')
    collection_date = models.DateField()
    expiry_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUSB_CHOICES, default='Active')

    def clean(self):
        # Check if hospital_license belongs to the same user
        if self.hospital_license.user != self.user:
            raise ValidationError("Hospital license does not belong to the logged-in user.")

    def save(self, *args, **kwargs):
        self.full_clean()  # This will call clean() and raise ValidationError if needed

        if not self.expiry_date:
            shelf_life_days = COMPONENT_SHELF_LIFE.get(self.blood_component, 42)
            self.expiry_date = self.collection_date + timedelta(days=shelf_life_days)

        if self.expiry_date and timezone.now().date() > self.expiry_date:
            self.status = 'Expired'
        else:
            self.status = 'Active'

        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.blood_group} {self.blood_component} - {self.unique_identifier} ({self.status})"
