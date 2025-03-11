#!/bin/bash

# Exit on error
set -e

echo "Running migrations..."
python manage.py migrate

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
gunicorn birthday_reminder_backend.wsgi:application --log-file - 