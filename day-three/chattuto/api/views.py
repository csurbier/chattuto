from django.contrib.auth.models import User
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from api.serializers import *
from chat.models import *
import logging

# Get an instance of a logger
logger = logging.getLogger('django')


class UserListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    filterset_fields = ['password','id','email','first_name','last_name','valid']
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    swagger_schema = None
    # Filter for connected user
    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.filter(pk=user.id)
        return queryset
    
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer
    swagger_schema = None
    # Filter for connected user
    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.get(pk=user.id)
        return queryset


class ChatListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    filterset_fields = ['id']
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    
    
class ChatDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    

class MessageListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    filterset_fields = ['id','type','isRead']
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    
    
class MessageDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Message.objects.all()
    serializer_class = MessageSerializer
    
    
