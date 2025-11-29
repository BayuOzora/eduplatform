from rest_framework import viewsets
from .models import Course
from .serializers import CourseSerializer
from rest_framework.permissions import AllowAny # Mengizinkan akses untuk testing

class CourseViewSet(viewsets.ModelViewSet):
    """
    ViewSet ini otomatis menyediakan fungsi:
    - LIST (Melihat semua data)
    - CREATE (Menambah data)
    - RETRIEVE (Melihat 1 data detail)
    - UPDATE (Mengedit data)
    - DESTROY (Menghapus data)
    """
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # permission_classes = [AllowAny] # Aktifkan ini jika Anda belum login di frontend