from django.contrib.auth.models import User
from django.db.models import Q
from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status


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
    # Filter for connected user
    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.filter(pk=user.id)
        return queryset
    
    
class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SearchUserListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = SearchUserSerializer
    search_fields = ['first_name','last_name']
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]
    # Filter for connected user
    def get_queryset(self):
        user = self.request.user
        queryset = User.objects.exclude(pk=user.id)
        return queryset

class ChatListView(generics.ListCreateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    queryset = Chat.objects.all()
    serializer_class = ChatSerializer
    filterset_fields = ['id']
    filter_backends = [DjangoFilterBackend,filters.SearchFilter,filters.OrderingFilter]

    def get_queryset(self):
        user = self.request.user
        queryset = Chat.objects.filter(Q(fromUser_id=user.id)|Q(toUser_id=user.id)).order_by("-updatedAt").select_related("fromUser").select_related("toUser")
        return queryset
    
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

class CreateChatView(APIView):
    def post(self, request, format=None):
        try:
            refUser = request.data["refUser"]
            chatWithUser = request.data["chatWithUser"]
            chat, created = Chat.objects.filter(Q(fromUser_id=refUser, toUser_id=chatWithUser) | Q(fromUser_id=chatWithUser, toUser_id=refUser)).get_or_create(fromUser_id=refUser, toUser_id=chatWithUser)
            print("Chat %s created %d"%(chat,created))
            serializer = ChatSerializer(chat)
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        except Exception as e:
            logger.error(e)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)

