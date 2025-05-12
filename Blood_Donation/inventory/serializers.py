from rest_framework import serializers
from .models import Attendant, Donor, BloodStock

class AttendantSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # ✅ Hide from frontend

    class Meta:
        model = Attendant
        fields = '__all__'


class DonorSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # ✅ Hide from frontend

    class Meta:
        model = Donor
        fields = '__all__'


class BloodStockSerializer(serializers.ModelSerializer):
    user = serializers.HiddenField(default=serializers.CurrentUserDefault())  # ✅ Hide from frontend
    expiry_date = serializers.DateField(read_only=True)
    status = serializers.CharField(read_only=True)

    class Meta:
        model = BloodStock
        fields = '__all__'
        read_only_fields = ['unique_identifier']
