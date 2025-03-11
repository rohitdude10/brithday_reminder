from django.shortcuts import render
from rest_framework import viewsets, status
from rest_framework.response import Response
from .models import BirthdayReminder
from .serializers import BirthdayReminderSerializer
import logging

logger = logging.getLogger(__name__)

# Create your views here.

class BirthdayReminderViewSet(viewsets.ModelViewSet):
    queryset = BirthdayReminder.objects.all().order_by('name')
    serializer_class = BirthdayReminderSerializer
    
    def create(self, request, *args, **kwargs):
        logger.info(f"Request data: {request.data}")
        serializer = self.get_serializer(data=request.data)
        if not serializer.is_valid():
            logger.error(f"Validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
    
    def update(self, request, *args, **kwargs):
        logger.info(f"Update request data: {request.data}")
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        if not serializer.is_valid():
            logger.error(f"Update validation errors: {serializer.errors}")
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        self.perform_update(serializer)
        return Response(serializer.data)
