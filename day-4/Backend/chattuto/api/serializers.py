from rest_framework.serializers import ModelSerializer
from chat.models import *

class UserSerializer(ModelSerializer):
    class Meta:
        ref_name="MyCustomUser"
        model = User
        fields = '__all__'

class ChatSerializer(ModelSerializer):

    class Meta:
        model = Chat
        fields = '__all__'

class MessageSerializer(ModelSerializer):

    class Meta:
        model = Message
        fields = '__all__'
    

    
    
