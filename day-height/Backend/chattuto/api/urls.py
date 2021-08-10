from django.conf.urls import include, url
from .views import *
from rest_framework.decorators import api_view
from rest_framework.routers import DefaultRouter
router = DefaultRouter()

urlpatterns = [
  url(r'^user/$', UserListView.as_view()),
  url(r'^user/(?P<pk>[0-9A-Fa-f-]+)/$', UserDetailView.as_view()),
  url(r'^searchUser/$', SearchUserListView.as_view()),

  url(r'^chat/$', ChatListView.as_view()),
  url(r'^chat/(?P<pk>[0-9A-Fa-f-]+)/$', ChatDetailView.as_view()),
  url(r'^createChat/$', CreateChatView.as_view()),
  url(r'^message/$', MessageListView.as_view()),
  url(r'^message/(?P<pk>[0-9A-Fa-f-]+)/$', MessageDetailView.as_view()),

]
