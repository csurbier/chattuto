from rest_framework import serializers
from rest_framework.serializers import ModelSerializer
from chat.models import *

class UserSerializer(ModelSerializer):
    class Meta:
        ref_name = "MyCustomUser"
        model = User
        fields = '__all__'

class ChatUserSerializer(ModelSerializer):
    class Meta:
        model = User
        fields = ['id','first_name','last_name']

class ChatSerializer(ModelSerializer):
    fromUser = ChatUserSerializer()
    toUser = ChatUserSerializer()
    lastMessage = serializers.SerializerMethodField()

    class Meta:
        model = Chat
        fields = '__all__'

    def get_lastMessage(self, obj):
        # get last message between users
        try:
            messages = Message.objects.filter(refChat=obj.id).select_related("refChat").select_related("author").order_by('-createdAt')[:1]
            return MessageSerializer(messages,many=True).data
        except Exception as e:
            print(e)
            return None

class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'
    
class SearchUserSerializer(ModelSerializer):
    class Meta:
        ref_name = "SearchUser"
        model = User
        fields = ["id","first_name","last_name"]
    
    
