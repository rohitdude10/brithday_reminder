#!/usr/bin/env python
"""
Script to run Django migrations manually.
This can be useful when deploying to Render or other platforms.
"""

import os
import sys
import django
from django.core.management import call_command

def main():
    """Run Django migrations."""
    print("Setting up Django...")
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'birthday_reminder_backend.settings')
    django.setup()
    
    print("Running migrations...")
    call_command('migrate')
    
    print("Migrations completed successfully!")

if __name__ == "__main__":
    main() 