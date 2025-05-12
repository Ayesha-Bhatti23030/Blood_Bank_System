from django.contrib import admin
from django.urls import path, include
from app1.views import home  
from django.conf import settings
from django.conf.urls.static import static



urlpatterns = [
    path('admin/', admin.site.urls),
    path('', home, name='home'), 
    path('api/',include('app1.urls')),
    path('api/', include('inventory.urls')),
    path('api/', include('search_req.urls')),
    
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

