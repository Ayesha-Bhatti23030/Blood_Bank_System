from collections import Counter
from rest_framework import serializers
from app1.models import HospitalProfile, User,ValidLicense
from inventory.models import BloodStock

class BloodInventorySummarySerializer(serializers.Serializer):
    blood_group = serializers.CharField()
    blood_component = serializers.CharField()
    price= serializers.IntegerField()
    quantity = serializers.IntegerField()
   

class HospitalSerializer(serializers.ModelSerializer):
    # We are using a custom method to calculate the inventory summary with quantity
    inventory = serializers.SerializerMethodField()
    image = serializers.SerializerMethodField()

    class Meta:
        model = HospitalProfile
        fields = ['id', 'name', 'address', 'phone', 'inventory', 'image']

    def get_image(self, obj):
        try:
            license_number = obj.user.username  # hospital_license
            license = ValidLicense.objects.filter(license_number=license_number).first()
            if license and license.image:
                return license.image.url
            return None
        except Exception as e:
            print("Error getting image:", e)
            return None
        
    def get_inventory(self, obj):
        # Get all blood stocks for this hospital (you can adjust filtering if needed)
        blood_stocks = obj.blood_inventory.all()

        # Count occurrences of (blood_group, blood_component)
        counter = Counter((b.blood_group, b.blood_component) for b in blood_stocks)

        price_dict = {}
        for b in blood_stocks:
            key = (b.blood_group, b.blood_component)
            if key not in price_dict:
                price_dict[key] = b.price  # Assuming 'price' is a field in the BloodStock model
        

        # Build summary list
        summary = [
            {
                'blood_group': bg,
                'blood_component': bc,
                'price':price_dict[(bg, bc)],
                'quantity': count
            }
            for (bg, bc), count in counter.items()
        ]

        return summary

class SearchResultSerializer(serializers.Serializer):
    hospital_id = serializers.IntegerField() 
    hospital_name = serializers.CharField()
    blood_group = serializers.CharField()
    blood_component = serializers.CharField()
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()

class SearchSerializer(serializers.ModelSerializer):
    # We are using a custom method to calculate the inventory summary with quantity
    inventory = serializers.SerializerMethodField()

    class Meta:
        model = HospitalProfile
        fields = ['name', 'inventory']

    def get_inventory(self, obj):
        # Get all blood stocks for this hospital (you can adjust filtering if needed)
        blood_stocks = obj.blood_inventory.all()

        # Count occurrences of (blood_group, blood_component)
        counter = Counter((b.blood_group, b.blood_component) for b in blood_stocks)

        price_dict = {}
        for b in blood_stocks:
            key = (b.blood_group, b.blood_component)
            if key not in price_dict:
                price_dict[key] = b.price  # Assuming 'price' is a field in the BloodStock model
        

        # Build summary list
        summary = [
            {
                'blood_group': bg,
                'blood_component': bc,
                'price':price_dict[(bg, bc)],
                'quantity': count
            }
            for (bg, bc), count in counter.items()
        ]

        return summary


