from django.contrib import admin
from .models import Donor,Attendant,BloodStock

# Register your models here.

admin.site.register(Donor)
admin.site.register(Attendant)
admin.site.register(BloodStock)
