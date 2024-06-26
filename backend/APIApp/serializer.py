from rest_framework.serializers import ModelSerializer
from .models import *

class TaskSerializer(ModelSerializer):
    class Meta:
        model = Task
        fields = ['id', 'title', 'description', 'created_at', 'due_date', 'priority', 'completed']