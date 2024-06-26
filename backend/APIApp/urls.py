from django.urls import path
from .views import *

urlpatterns = [
    path("api/register/", registerUser),
    path("api/login/", LoginView.as_view(), name='knox_login'),
    path("api/logoutall/", LogoutAllView.as_view(), name='knox_logoutall'),
    path("api/get-username/", getUsername),
    path("api/get-task/<int:id>", getTask),
    path("api/get-all-tasks/", getAllTasks),
    path("api/create-task/", createTask),
    path("api/update-task/<int:id>", updateTask),
    path("api/delete-task/<int:id>", deleteTask),
]
