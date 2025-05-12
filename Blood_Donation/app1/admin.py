from django.contrib import admin
from .models import HospitalProfile,ValidLicense,User

class UserAdmin(admin.ModelAdmin):
    list_display=['username','email']

class HospitalProfileAdmin(admin.ModelAdmin):
    list_editable=['verified']
    list_display=['name','address','postal_code','phone','operating_hours','status','verified']

# Register your models here.
admin.site.register(HospitalProfile)
admin.site.register(User)
admin.site.register(ValidLicense)
