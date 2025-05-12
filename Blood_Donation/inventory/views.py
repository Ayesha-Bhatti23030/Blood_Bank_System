from rest_framework import viewsets, permissions
from rest_framework.response import Response
from rest_framework import status
from .models import Attendant, Donor, BloodStock
from .serializers import AttendantSerializer, DonorSerializer, BloodStockSerializer

class AttendantViewSet(viewsets.ModelViewSet):
    queryset = Attendant.objects.all()
    serializer_class = AttendantSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Attendant.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DonorViewSet(viewsets.ModelViewSet):
    queryset = Donor.objects.all()
    serializer_class = DonorSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return Donor.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class BloodStockViewSet(viewsets.ModelViewSet):
    queryset = BloodStock.objects.all()
    serializer_class = BloodStockSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        return BloodStock.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

        
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            print("Validation Errors:", serializer.errors)  # This will print in your terminal
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
