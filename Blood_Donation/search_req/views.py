from rest_framework import generics
from app1.models import HospitalProfile,User
from .serializers import HospitalSerializer,SearchResultSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from inventory.models import BloodStock
from collections import Counter
from django.db.models import Q
import logging

class HospitalListView(generics.ListAPIView):
    queryset = HospitalProfile.objects.filter(verified=True, user__is_active=True)
    serializer_class = HospitalSerializer

class HospitalDetailView(generics.RetrieveAPIView):
    queryset = HospitalProfile.objects.filter(verified=True, user__is_active=True)
    serializer_class = HospitalSerializer
    lookup_field = 'id'  # or 'pk' if you prefer



# ✅ Blood Stock Search excluding current user's hospital
class SearchView(APIView):
    permission_classes = [IsAuthenticated]  # Require login

    def get(self, request):
        query = request.query_params.get('query', '').strip()
        if not query:
            return Response({"error": "Query parameter is required"}, status=400)

        current_user = request.user

        # Filter search and exclude current hospital's inventory
        stocks = BloodStock.objects.filter(
            Q(blood_group__icontains=query) |
            Q(blood_component__icontains=query) |
            Q(hospital_license__name__icontains=query),
            hospital_license__verified=True,
            hospital_license__user__is_active=True
        ).exclude(hospital_license__user=current_user)

        # Group and count the results
        grouped = {}
        for stock in stocks:
            key = (stock.hospital_license.id, stock.hospital_license.name, stock.blood_group, stock.blood_component)
            if key not in grouped:
                grouped[key] = {
                    'hospital_id': stock.hospital_license.id,
                    'hospital_name': stock.hospital_license.name,
                    'blood_group': stock.blood_group,
                    'blood_component': stock.blood_component,
                    'price': stock.price,
                    'quantity': 1
                }
            else:
                grouped[key]['quantity'] += 1

        return Response(list(grouped.values()))