from django.contrib import admin
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from courses.views import CourseViewSet
from assignments.views import AssignmentViewSet
# Import view lain jika diperlukan

# Router otomatis membuat URL seperti /api/courses/, /api/courses/1/, dll.
router = DefaultRouter()
router.register(r'courses', CourseViewSet, basename='course')
# router.register(r'assignments', AssignmentViewSet) # Contoh untuk assignment

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)), # Semua URL API diawali dengan /api/
]