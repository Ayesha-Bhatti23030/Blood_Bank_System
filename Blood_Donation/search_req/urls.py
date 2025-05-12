from django.urls import path
from .views import HospitalListView, HospitalDetailView,SearchView

urlpatterns = [
    path('hospitals/', HospitalListView.as_view(), name='hospital-list'),
    path('hospitals/<int:id>/', HospitalDetailView.as_view(), name='hospital-detail'),
    path('search/',SearchView.as_view(),name='search-result'),
]
