# Birthday Reminder Application

A simple application to keep track of birthdays, built with React and Django.

## Features

- Add, edit, and delete birthdays
- View upcoming birthdays
- See how many days until the next birthday
- Calculate current age and next age

## Project Structure

- `birthday_reminder_backend/`: Django backend
- `birthday-reminder-frontend/`: React frontend

## Setup and Installation

### Backend (Django)

1. Navigate to the backend directory:
   ```
   cd birthday_reminder_backend
   ```

2. Install dependencies:
   ```
   pip install django djangorestframework django-cors-headers
   ```

3. Apply migrations:
   ```
   python manage.py migrate
   ```

4. Run the development server:
   ```
   python manage.py runserver
   ```

The backend will be available at http://localhost:8000/

### Frontend (React)

1. Navigate to the frontend directory:
   ```
   cd birthday-reminder-frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm start
   ```

The frontend will be available at http://localhost:3000/

## API Endpoints

- `GET /api/birthdays/`: List all birthdays
- `POST /api/birthdays/`: Create a new birthday
- `GET /api/birthdays/{id}/`: Retrieve a specific birthday
- `PUT /api/birthdays/{id}/`: Update a specific birthday
- `DELETE /api/birthdays/{id}/`: Delete a specific birthday 