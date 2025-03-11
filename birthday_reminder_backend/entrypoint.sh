#!/bin/bash
set -e

# Run migrations
python manage.py migrate

# Start the server
gunicorn birthday_reminder_backend.wsgi:application --bind 0.0.0.0:${PORT:-8000} 