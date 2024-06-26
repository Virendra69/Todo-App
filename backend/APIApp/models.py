from django.db import models
from django.contrib.auth.models import User

# Model to store the tasks for each user
class Task(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    title = models.CharField(max_length=256)
    description = models.TextField(default="No Description...")
    created_at = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    priority = models.IntegerField(default=1)
    completed = models.BooleanField(default=False)