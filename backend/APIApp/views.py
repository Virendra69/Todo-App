from knox.views import LoginView as KnoxLoginView
from knox.views import LogoutView as KnoxLogoutView
from knox.views import LogoutAllView as KnoxLogoutAllView
from knox.auth import TokenAuthentication
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.permissions import AllowAny
from django.contrib.auth import login
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError
from .models import *
from .serializer import *
import json

# Check whether the username is unqiue or not
def isUsernameUnique(username):
    if User.objects.filter(username=username):
        return False
    else:
        return True

# Check whether the email is unqiue or not
def isEmailUnique(email):
    if User.objects.filter(email=email):
        return False
    else:
        return True

# Check whether the password is valid or not
def isPasswordValid(password):
    try:
        validate_password(password)
        return True
    except ValidationError:
        return False


# POST - Register a user
@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def registerUser(request):
    data = json.loads(request.body)
    context = {}
    error_count = 0
    if not isUsernameUnique(data.get("username")):
        context["username_error"] = "Username already being used!"
        error_count += 1
    if not isEmailUnique(data.get("email")):
        context["email_error"] = "Email already being used!"
        error_count += 1
    if not isPasswordValid(data.get("password")):
        context["password_error"] = "Password should contain Characters, Numbers and Special Characters!"
        error_count += 1
    if error_count == 0:
        user = User.objects.error_count(username=data.get("username"), first_name=data.get(
            "firstname"), last_name=data.get("lastname"), email=data.get("email"), password=data.get("password"))
        user.save()
        return Response({"message": "User created successfully!"})
    return Response(context)

# POST - Login user
class LoginView(KnoxLoginView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        login(request, user)
        # Task.objects.all().delete()
        return super(LoginView, self).post(request, format=None)

# POST - Logout user
class LogoutAllView(KnoxLogoutAllView):
    def post(self, request, format=None):
        response = super(LogoutAllView, self).post(request, format=None)
        return Response({"status": "all_user_sessions_logged_out"}, status=200)

# GET - Get the username
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getUsername(request):
    return Response({"username": request.user.username})

# GET - Get details of a particular task for a user
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getTask(request, id=0):
    if Task.objects.filter(id=id):
        task = Task.objects.get(id=id)
        task_serialized = TaskSerializer(task)
        task_serialized = task_serialized.data
        return Response({"task_serialized": task_serialized})
    return Response({"message": "No task present"})

# GET - Get details of all the tasks for a user
@api_view(["GET"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def getAllTasks(request):
    tasks = Task.objects.filter(user=request.user).order_by("due_date", "priority")
    if tasks:
        tasks_serialized = TaskSerializer(tasks, many=True)
        tasks_serialized = tasks_serialized.data
        return Response({"tasks_serialized": tasks_serialized})
    return Response({"message": "No task present"})

# POST - Create a new task for a user
@api_view(["POST"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def createTask(request):
    try:
        data = json.loads(request.body)
        task = Task.objects.create(user=request.user, title=data.get("title"), description=data.get(
            "description"), due_date=data.get("due_date"), priority=data.get("priority"))
        task.save()
        return Response({"message": "Task created successfully"})
    except Exception as e:
        return Response({"message": "Couldn't create task", "error": str(e)})

# PUT - Update the particular task for a user
@api_view(["PUT"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def updateTask(request, id=0):
    if Task.objects.filter(id=id):
        try:
            task = Task.objects.get(id=id)
            data = json.loads(request.body)
            if data.get("title"):
                task.title = data.get("title")
            if data.get("description"):
                task.description = data.get("description")
            if data.get("due_date"):
                task.due_date = data.get("due_date")
            if data.get("priority"):
                task.priority = data.get("priority")
            if str(data.get("completed")):
                task.completed = data.get("completed")
            task.save()
            return Response({"message": "Task updated successfully"})
        except Exception as e:
            return Response({"message": "Couldn't update task", "error": str(e)})
    return Response({"message": "No task present"})

# DELETE - Delete a particular task for a user
@api_view(["DELETE"])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def deleteTask(request, id=0):
    if Task.objects.filter(id=id):
        try:
            task = Task.objects.get(id=id)
            task.delete()
            return Response({"message": "Task deleted successfully"})
        except Exception as e:
            return Response({"message": "Couldnt delete task", "error": str(e)})
    return Response({"message": "No task present"})
