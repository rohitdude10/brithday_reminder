#!/bin/bash

# Exit on error
set -e

# Frontend build
echo "Building frontend..."
cd birthday-reminder-frontend
npm install
npm run build
cd ..

# Backend setup
echo "Setting up backend..."
cd birthday_reminder_backend
pip install -r requirements.txt
python manage.py collectstatic --noinput
python manage.py migrate
cd ..

echo "Build completed successfully!" 