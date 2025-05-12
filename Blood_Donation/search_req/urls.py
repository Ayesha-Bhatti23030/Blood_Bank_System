from django.urls import path
from .views import HospitalListView, HospitalDetailView

urlpatterns = [
    path('hospitals/', HospitalListView.as_view(), name='hospital-list'),
    path('hospitals/<int:id>/', HospitalDetailView.as_view(), name='hospital-detail'),
]
