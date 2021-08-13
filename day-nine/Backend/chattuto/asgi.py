# chattuto/asgi.py
import os

from channels.auth import AuthMiddlewareStack
from channels.routing import ProtocolTypeRouter, URLRouter
from django.core.asgi import get_asgi_application
import chat.routing
from django_channels_jwt_auth_middleware.auth import JWTAuthMiddlewareStack

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chattuto.settings")

application = ProtocolTypeRouter({
  "http": get_asgi_application(),
  "websocket": JWTAuthMiddlewareStack(
        URLRouter(
            chat.routing.websocket_urlpatterns
        )
    ),
})