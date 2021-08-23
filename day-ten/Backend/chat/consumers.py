# chat/consumers.py
import json
from asgiref.sync import async_to_sync
from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from chat.models import *
import logging
logger = logging.getLogger('django')

class ChatConsumer(WebsocketConsumer):
    def connect(self):
        try:
            self.room_name = self.scope['url_route']['kwargs']['room_name']
            chat = Chat.objects.get(id=self.room_name)
            self.room_group_name = 'chat_%s' % str(chat.id)
            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name,
                self.channel_name
            )

            self.accept()
        except Chat.DoesNotExist as e:
            print(e)
            return


    def disconnect(self, close_code):
        # Leave room group
       async_to_sync(self.channel_layer.group_discard)(
                self.room_group_name,
                self.channel_name
       )

    def new_message(self,data):
        logger.info("==on save new_message")
        message = Message()
        message.refChat_id = data["refChat"]
        message.message = data["message"]
        message.author_id = data["author"]
        message.isRead = False
        message.type = data["type"]
        message.extraData = data["extraData"]
        message.save()
        # check if we need to send a notification
        try:
            chat = Chat.objects.get(id=message.refChat_id)
            if chat.fromUser.id!=message.author_id:
                 user = chat.fromUser
                 if user.online==False:
                     logger.info("===envoi notification to %s"%user)
                     self.sendNotification(user,chat.toUser)
                 else:
                     logger.info("User %s online"%user)
            elif chat.toUser != message.author_id:
                user = chat.toUser
                if user.online == False:
                    logger.info("===envoi notification to %s" % user)
                    self.sendNotification(user,chat.fromUser)
                else:
                    logger.info("User %s online" % user)
        except Exception as e:
            logger.error(e)

    def sendNotification(self,user,sender):
        try:
            # need to check last notification date for user
            from datetime import datetime, timedelta, date
            today = datetime.now()
            twominutesago = today - timedelta(minutes=2)
            nbNotif = Notifications.objects.filter(toUser_id=user,createdAt__lte=twominutesago).count()
            if nbNotif>0:
                #avoid spam do nothing
                logger.info("===found %d notifications",nbNotif)
                pass
            else:
                message = "You have received a new message from %s" % (sender.first_name)
                notif = Notifications()
                notif.toUser = user
                notif.message = message
                notif.status = 0 # to send
                notif.save()
        except Exception as e:
            logger.error(e)

    """
        data will be a json 
        {
            refChat : refChat
            author : refUser
            message : ""
            type : 0
            extraData : "",
            eventType: ""
        }
    """

    def receive(self, text_data):
        data_json = json.loads(text_data)
        logger.info("===Received")
        logger.info(data_json)
        self.new_message(data_json)
        # Send message to room group
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                'type': 'chat_message',
                'message': data_json
            }
        )


    # Receive message from room group
    def chat_message(self, event):
        print("==Chat message")
        print(event)
        message = event['message']

        # Send message to WebSocket
        self.send(text_data=json.dumps({
            'message': message
        }))
