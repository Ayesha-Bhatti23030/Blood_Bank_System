from collections import Counter
from rest_framework import serializers
from app1.models import HospitalProfile, User
from inventory.models import BloodStock

class BloodInventorySummarySerializer(serializers.Serializer):
    blood_group = serializers.CharField()
    blood_component = serializers.CharField()
    price= serializers.IntegerField()
    quantity = serializers.IntegerField()
   

class HospitalSerializer(serializers.ModelSerializer):
    # We are using a custom method to calculate the inventory summary with quantity
    inventory = serializers.SerializerMethodField()

    class Meta:
        model = HospitalProfile
        fields = ['id', 'name', 'address', 'phone', 'inventory']

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

# Add this to your serializers.py

class BloodSearchResultSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    address = serializers.CharField()
    phone = serializers.CharField()
    blood_group = serializers.CharField()
    blood_component = serializers.CharField()
    quantity = serializers.IntegerField()
    price = serializers.IntegerField()
