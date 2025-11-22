# EduPlatform

Educational Platform with Django REST Framework Backend

## Project Structure

```
eduplatform/
├── backend/          # Django REST Framework API
└── frontend/         # (To be added by frontend developer)
```

## Backend

Django REST Framework educational platform with:
- JWT Authentication
- Role-based permissions (Student, Lecturer, Admin)
- User management
- Course management with enrollments
- Materials and assignments
- Discussion forums with threaded comments
- PostgreSQL database

See `backend/README.md` for detailed backend documentation.

## Setup

### Backend Setup
```bash
cd backend
python -m venv venv
venv\Scripts\activate  # Windows
pip install -r requirements.txt
```

Configure database in `backend/.env`:
```
DB_NAME=eduplatform
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

Run migrations and start server:
```bash
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

API available at: http://127.0.0.1:8000/api/

## Contributors

- Backend: Ricky Darmawan
- Frontend: (Coming soon)
