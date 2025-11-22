EduPlatform

Educational Platform with Django REST Framework Backend and React Frontend

Project Structure

eduplatform/
├── backend/          # Django REST Framework API
└── frontend/         # React + Vite Frontend


Backend

Django REST Framework educational platform with:

JWT Authentication

Role-based permissions (Student, Lecturer, Admin)

User management

Course management with enrollments

Materials and assignments

Discussion forums with threaded comments

PostgreSQL database

See backend/README.md for detailed backend documentation.

Frontend

React-based Single Page Application built with Vite, featuring:

Responsive layout (Desktop Sidebar / Mobile Bottom Nav)

Dashboard with academic progress visualization

Course management interface

Task tracking (Kanban-style)

Real-time chat simulation

User profile management

Tailwind CSS for styling

Setup

Backend Setup

cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt


Configure database in backend/.env:

DB_NAME=eduplatform
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432


Run migrations and start server:

python manage.py migrate
python manage.py createsuperuser
python manage.py runserver


API available at: http://127.0.0.1:8000/api/

Frontend Setup

cd frontend
npm install
npm run dev


Frontend available at: http://localhost:5173/

Contributors

Backend: Ricky Darmawan

Frontend: Muhammad Daffa Ramdhani

Database: Muhammad Fabio Usama