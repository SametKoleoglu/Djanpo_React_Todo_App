from django.shortcuts import render
from rest_framework import viewsets
from . import serializers
from . import models
 
# Create your views here.

class TodoViewSet(viewsets.ModelViewSet):
    serializer_class = serializers.TodoSerializer
    queryset = models.Todo.objects.all()