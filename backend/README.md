# Educational Platform Backend

Backend API untuk Educational Platform menggunakan Django REST Framework.

## Struktur Database

Project ini mengimplementasikan sistem educational platform dengan relasi:
- **Users**: Student, Lecturer, Admin
- **Courses**: Mata kuliah yang diajar oleh lecturer
- **Enrollments**: Pendaftaran student ke course
- **Materials**: Materi pembelajaran per course
- **Assignments**: Tugas per course
- **Submissions**: Pengumpulan tugas oleh student
- **Discussions**: Forum diskusi per course
- **Discussion Comments**: Komentar dan balasan diskusi

## Tech Stack

- **Django 5.1.6**
- **Django REST Framework 3.15.2**
- **PostgreSQL** (Database)
- **JWT Authentication** (djangorestframework-simplejwt)
- **CORS Headers** (django-cors-headers)

## Setup

### 1. Install Dependencies
```bash
pip install -r requirements.txt
```

### 2. Setup PostgreSQL Database
Buat database PostgreSQL:
```sql
CREATE DATABASE eduplatform;
CREATE USER eduplatform_user WITH PASSWORD 'your_password';
ALTER ROLE eduplatform_user SET client_encoding TO 'utf8';
ALTER ROLE eduplatform_user SET default_transaction_isolation TO 'read committed';
ALTER ROLE eduplatform_user SET timezone TO 'UTC';
GRANT ALL PRIVILEGES ON DATABASE eduplatform TO eduplatform_user;
```

### 3. Setup Environment Variables
Salin file `.env.example` ke `.env` dan sesuaikan konfigurasi database Anda:
```bash
cp .env.example .env
```

Edit `.env` file:
```
DB_NAME=eduplatform
DB_USER=eduplatform_user
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 4. Migrasi Database
```bash
python manage.py makemigrations
python manage.py migrate
```

### 5. Buat Superuser
```bash
python manage.py createsuperuser
```

### 6. Jalankan Server
```bash
python manage.py runserver
```

## Authentication

Project ini menggunakan JWT (JSON Web Token) authentication.

### Obtain Token
```bash
POST /api/token/
{
  "username": "your_username",
  "password": "your_password"
}
```

Response:
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

### Use Token
Sertakan token di header request:
```
Authorization: Bearer <access_token>
```

### Refresh Token
```bash
POST /api/token/refresh/
{
  "refresh": "your_refresh_token"
}
```

## API Endpoints

Semua endpoint tersedia di `/api/`:

### Authentication
- `POST /api/token/` - Obtain JWT token
- `POST /api/token/refresh/` - Refresh access token

### Resources
- `/api/users/` - User management
- `/api/courses/` - Course management
- `/api/enrollments/` - Enrollment management
- `/api/materials/` - Course materials
- `/api/assignments/` - Assignments
- `/api/submissions/` - Student submissions
- `/api/discussions/` - Discussion forums
- `/api/discussion-comments/` - Discussion comments

## Role-based Permissions

Project ini menggunakan role-based access control dengan 3 role:
- **Admin**: Full access ke semua resource
- **Lecturer**: Dapat membuat course, assignment, material, dan grading
- **Student**: Dapat enroll course, submit assignment, dan diskusi

### Permission Matrix

| Resource | List | Retrieve | Create | Update | Delete |
|----------|------|----------|--------|--------|--------|
| User | Auth | Auth | Public | Admin | Admin |
| Course | Public | Public | Lecturer/Admin | Course Owner | Course Owner |
| Enrollment | Auth | Auth | Student | Lecturer/Admin | Lecturer/Admin |
| Material | Public | Public | Course Owner | Course Owner | Course Owner |
| Assignment | Public | Public | Course Owner | Course Owner | Course Owner |
| Submission | Auth | Owner/Lecturer | Student | Owner/Lecturer | Owner |
| Discussion | Public | Public | Auth | Owner/Admin | Owner/Admin |
| Comment | Public | Public | Auth | Owner/Admin | Owner/Admin |

## Admin Panel

Akses admin panel di `http://localhost:8000/admin/`

## Testing API

Gunakan browsable API di `http://localhost:8000/api/` atau tools seperti Postman/Thunder Client.
