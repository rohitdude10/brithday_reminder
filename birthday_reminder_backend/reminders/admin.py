from django.contrib import admin
from .models import BirthdayReminder

@admin.register(BirthdayReminder)
class BirthdayReminderAdmin(admin.ModelAdmin):
    list_display = ('name', 'date_of_birth', 'created_at')
    search_fields = ('name',)
    list_filter = ('date_of_birth',)
