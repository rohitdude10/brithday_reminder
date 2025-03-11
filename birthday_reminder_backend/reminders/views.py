from django.shortcuts import render
from rest_framework import viewsets
from .models import BirthdayReminder
from .serializers import BirthdayReminderSerializer

# Create your views here.

class BirthdayReminderViewSet(viewsets.ModelViewSet):
    queryset = BirthdayReminder.objects.all().order_by('name')
    serializer_class = BirthdayReminderSerializer
