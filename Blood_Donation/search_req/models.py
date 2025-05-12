from django.db import models
from django.contrib.auth.models import AbstractUser
from datetime import timedelta
from django.utils import timezone
from django.core.validators import RegexValidator
from django.core.exceptions import ValidationError
from django.db.models.signals import post_save
from app1.models import User,HospitalProfile,phone_validator,gmail_validator,strong_password_validator,HospitalProfile,User,COMPONENT_SHELF_LIFE,STATUSB_CHOICES,GENDER_CHOICES,REQUEST_TYPE_CHOICES,REQUESTING_STATUS_CHOICES,BLOOD_TYPE_CHOICES ,BLOOD_COMPONENT_CHOICES,DEPOSIT_STATUS_CHOICES,STATUS_CHOICES
from inventory.models import Attendant,Donor,BloodStock

# Create your models here.


class Request(models.Model):
    tracking_id = models.CharField(max_length=100, primary_key=True)
    request_type = models.CharField(max_length=20, choices=REQUEST_TYPE_CHOICES, default='buying')
    requesting_hospital = models.ForeignKey('app1.HospitalProfile', related_name='requesting_requests', on_delete=models.CASCADE)
    donor_hospital = models.ForeignKey('app1.HospitalProfile', related_name='donor_requests', on_delete=models.CASCADE)
    requesting_status = models.CharField(max_length=20, choices=REQUESTING_STATUS_CHOICES, default='pending_verification')
    blood_type = models.CharField(max_length=3, choices=BLOOD_TYPE_CHOICES, default='O+')
    blood_component = models.CharField(max_length=20, choices=BLOOD_COMPONENT_CHOICES, default='Whole Blood')
    quantity = models.IntegerField()
    attendant_cnic = models.ForeignKey('inventory.Attendant', on_delete=models.CASCADE)
    donor_cnic = models.ForeignKey('inventory.Donor', on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['tracking_id'], name='unique_tracking_id'),
        ]

class Deposit(models.Model):
    blood_price = models.IntegerField()
    deposit_amount = models.IntegerField()
    date_submission = models.DateField()
    date_collection = models.DateField()
    status = models.CharField(max_length=10, choices=DEPOSIT_STATUS_CHOICES, default='Pending')
    tracking_id = models.ForeignKey(Request, on_delete=models.CASCADE)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['tracking_id'], name='unique_tracking_deposit')
        ]

