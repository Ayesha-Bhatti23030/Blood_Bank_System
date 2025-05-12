from django.contrib import admin
from .models import HospitalProfile,ValidLicense,User
from django.utils.html import mark_safe

class ValidLicenseAdmin(admin.ModelAdmin):
    list_display = ['license_number', 'preview_image']

    def preview_image(self, obj):
        if obj.image:
            return mark_safe(f'<img src="{obj.image.url}" width="100" height="100" />')
        return "-"
    
class UserAdmin(admin.ModelAdmin):
    list_display=['username','email']

class HospitalProfileAdmin(admin.ModelAdmin):
    list_editable=['verified']
    list_display=['name','address','postal_code','phone','operating_hours','status','verified']

# Register your models here.
admin.site.register(HospitalProfile)
admin.site.register(User)
admin.site.register(ValidLicense, ValidLicenseAdmin)
