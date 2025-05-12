from django.shortcuts import render
from django.http import JsonResponse
from .models import User,HospitalProfile
from app1.serializers import UserSerializer,MyTokenObtainPairSerializer,RegisterSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response


def home(request):
    return JsonResponse({'message': 'Welcome to the Blood Bank System API'})

class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class=MyTokenObtainPairSerializer

class RegisterView(generics.CreateAPIView):
    queryset=User.objects.all()
    permission_classes=([AllowAny])
    serializer_class=RegisterSerializer

@api_view(['GET','POST'])
@permission_classes([IsAuthenticated])

def dashboard(request):
    if request.method=="GET":
        context=f"Hey {request.user}, You are seeing a GET response"
        return Response({'response':context},status==status.HTTP_200_OK)
    elif request.method=="POST":
        text= request.POST.get("text")
        response=f"Hey {request.user}, Your text is {text}"
        return Response({'response':context},status==status.HTTP_200_OK)
    
    return Response({},status==status.HTTP_400_BAD_REQUEST)


