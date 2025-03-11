from django.db import models

# Create your models here.

class BirthdayReminder(models.Model):
    name = models.CharField(max_length=100)
    date_of_birth = models.DateField()
    notes = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.name
