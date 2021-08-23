from django.urls import re_path

from . import consumers

websocket_urlpatterns = [
    re_path('ws/chat/(?P<room_name>[-a-zA-Z0-9_]+)/', consumers.ChatConsumer.as_asgi()),
]