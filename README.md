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
   pip install -r requirements.txt
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

## Deployment

### Deploying Backend to Koyeb

1. Create a Koyeb account at https://koyeb.com/

2. Install the Koyeb CLI (optional):
   ```
   # For macOS
   brew install koyeb/tap/cli
   
   # For Linux
   curl -fsSL https://cli.koyeb.com/install.sh | bash
   ```

3. Deploy using the Koyeb web interface:
   - Connect your GitHub repository
   - Create a new app from the repository
   - Select the "Docker" runtime
   - Set the build directory to `birthday_reminder_backend`
   - Configure environment variables:
     - `DEBUG`: `False`
     - `ALLOWED_HOSTS`: `*.koyeb.app,localhost,127.0.0.1`
     - `CORS_ALLOWED_ORIGINS`: Your frontend URL (e.g., `https://brithday-reminder.onrender.com,http://localhost:3000`)
     - `SECRET_KEY`: A secure random string

4. Alternatively, deploy using the Koyeb CLI:
   ```
   koyeb app init birthday-reminder --git github.com/yourusername/birthday-reminder --git-branch main --git-builder dockerfile --git-workdir birthday_reminder_backend --ports 8000:http --env DEBUG=False --env ALLOWED_HOSTS=*.koyeb.app,localhost,127.0.0.1 --env CORS_ALLOWED_ORIGINS=https://brithday-reminder.onrender.com,http://localhost:3000
   ```

5. Once deployed, update your frontend's `.env.production` file with the new backend URL:
   ```
   REACT_APP_API_URL=https://your-app-name.koyeb.app/api
   ```

### Deploying Frontend to Render

1. Create a Render account at https://render.com/

2. Connect your GitHub repository to Render

3. Create a new Web Service:
   - Select "Static Site"
   - Connect your repository
   - Configure the service:
     - Name: `birthday-reminder-frontend`
     - Build Command: `cd birthday-reminder-frontend && npm install && npm run build`
     - Publish Directory: `birthday-reminder-frontend/build`

4. Set environment variables:
   - `REACT_APP_API_URL`: URL of your deployed backend API (e.g., `https://your-backend-url.onrender.com/api`)

5. Deploy the service 