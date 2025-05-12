from django.contrib import admin
from django.urls import path, include
from app1.views import home  


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'), 
    path('api/',include('app1.urls')),
    path('api/', include('inventory.urls')),
    path('api/', include('search_req.urls')),
    
]

