from rest_framework import generics
from app1.models import HospitalProfile,User
from .serializers import HospitalSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from inventory.models import BloodStock

class HospitalListView(generics.ListAPIView):
    queryset = HospitalProfile.objects.filter(verified=True, user__is_active=True)
    serializer_class = HospitalSerializer

class HospitalDetailView(generics.RetrieveAPIView):
    queryset = HospitalProfile.objects.filter(verified=True, user__is_active=True)
    serializer_class = HospitalSerializer
    lookup_field = 'id'  # or 'pk' if you prefer

