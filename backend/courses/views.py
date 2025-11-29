from rest_framework import viewsets, permissions
from .models import Course
from .serializers import CourseSerializer

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    # Mengizinkan akses tanpa login untuk kemudahan testing awal
    permission_classes = [permissions.AllowAny]

    def perform_create(self, serializer):
        # Jika user login, simpan sebagai instructor. Jika tidak, biarkan kosong.
        if self.request.user.is_authenticated:
            serializer.save(instructor=self.request.user)
        else:
            serializer.save()