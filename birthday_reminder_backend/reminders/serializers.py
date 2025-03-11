from rest_framework import serializers
from .models import BirthdayReminder

class BirthdayReminderSerializer(serializers.ModelSerializer):
    class Meta:
        model = BirthdayReminder
        fields = ['id', 'name', 'date_of_birth', 'notes', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at'] 