#!/bin/bash
set -e

echo "Starting Django application..."
echo "ALLOWED_HOSTS from environment: $ALLOWED_HOSTS"

# Update ALLOWED_HOSTS with the actual hostname
echo "Updating ALLOWED_HOSTS with the actual hostname..."
python update_allowed_hosts.py

# Run migrations
echo "Running migrations..."
python manage.py migrate

# Print debug information
echo "Checking Django configuration..."
python -c "import os; from django.conf import settings; print('DEBUG:', settings.DEBUG); print('ALLOWED_HOSTS:', settings.ALLOWED_HOSTS); print('CSRF_TRUSTED_ORIGINS:', settings.CSRF_TRUSTED_ORIGINS)"

# Start the server
echo "Starting Gunicorn server..."
gunicorn birthday_reminder_backend.wsgi:application --bind 0.0.0.0:${PORT:-8000} 