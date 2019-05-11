from rest_framework import routers
from .api import LeadViewSet

# this is django rest framework specific
router = routers.DefaultRouter()
router.register('api/leads', LeadViewSet, 'leads')

urlpatterns = router.urls
