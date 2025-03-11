from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BirthdayReminderViewSet

router = DefaultRouter()
router.register(r'birthdays', BirthdayReminderViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 