from rest_framework import serializers
from .models import Course, Enrollment
from users.serializers import UserSerializer
from users.models import User

class CourseSerializer(serializers.ModelSerializer):
    teacher_detail = UserSerializer(source='teacher', read_only=True)
    teacher = serializers.PrimaryKeyRelatedField(queryset=User.objects.filter(role='teacher'))

    class Meta:
        model = Course
        fields = ['id', 'title', 'description', 'teacher', 'teacher_detail', 'created_at', 'updated_at']

class EnrollmentSerializer(serializers.ModelSerializer):
    student_detail = UserSerializer(source='student', read_only=True)
    course_detail = CourseSerializer(source='course', read_only=True)

    class Meta:
        model = Enrollment
        fields = ['id', 'student', 'student_detail', 'course', 'course_detail', 'enrolled_at']