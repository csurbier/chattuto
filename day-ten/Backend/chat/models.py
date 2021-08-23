# *coding: utf-8*
from __future__ import unicode_literals

from django.contrib.auth.base_user import BaseUserManager, AbstractBaseUser
from django.contrib.auth.models import PermissionsMixin
from django.contrib.gis.db import models
import uuid
from django.utils.translation import ugettext_lazy as _

class UserManager(BaseUserManager):
    use_in_migrations = True

    def _create_user(self, email, password, **extra_fields):
        if not email:
            raise ValueError('The given email must be set')
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_user(self, email, password=None, **extra_fields):
        extra_fields.setdefault('is_superuser', False)
        return self._create_user(email, password, **extra_fields)

    def create_superuser(self, email, password, **extra_fields):
        extra_fields.setdefault('is_superuser', True)

        if extra_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must have is_superuser=True.')

        return self._create_user(email, password, **extra_fields)


class User(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(_('email address'), unique=True)
    first_name = models.CharField(_('first name'), max_length=30, blank=True)
    last_name = models.CharField(_('last name'), max_length=30, blank=True)
    date_joined = models.DateTimeField(_('date joined'), auto_now_add=True)
    is_active = models.BooleanField(_('active'), default=True)
    is_staff = models.BooleanField(_('active'), default=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    lastConnexionDate = models.DateTimeField(null=True, blank=True)
    valid = models.BooleanField(default=True)
    online = models.BooleanField(default=False)
    objects = UserManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []

    class Meta:
        verbose_name = _('user')
        verbose_name_plural = _('users')

    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    @property
    def last_login(self):
        return self.lastConnexionDate

    def __str__(self):
        return u'%s' % (self.email)

class Chat(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    fromUser = models.ForeignKey(User, db_index=True,on_delete=models.SET_NULL, null=True,related_name="fromuser")
    toUser = models.ForeignKey(User, db_index=True,on_delete=models.SET_NULL, null=True,related_name="toUser")
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)
    unique_together = (("fromUser", "toUser"),)

    def __str__(self):
        return u'%s - %s' % (self.fromUser,self.toUser)


class Message(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    refChat = models.ForeignKey(Chat, db_index=True,on_delete=models.CASCADE)
    message = models.TextField()
    msg_type = (
        (0, "TEXT"),
        (1, "GEOLOC"),
        (2, "PHOTO"),
    )
    type = models.IntegerField(choices=msg_type, default=0)
    extraData = models.TextField(null=True, blank=True)#models.CharField(default='', null=True, blank=True, max_length=255)
    author = models.ForeignKey(User, db_index=True,related_name='author',on_delete=models.SET_NULL,null=True)
    isRead = models.BooleanField(default=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    def __str__(self):
        return u'%s - %d' % (self.refChat,self.type)


class Notifications(models.Model):
    toUser = models.ForeignKey(User, db_index=True,related_name="userNotif",on_delete=models.CASCADE)
    message = models.CharField(max_length=1024,null=True,blank=True)
    status_choice = (
        (0, "TO_SEND"),
        (1, "SENDING"),
        (2, "SENT"),
        (3, "ERROR_SENDING"),
        (4, "NO_PUSH_TOKEN"),
        (5, "SEND_PUSH_DISABLE")
    )
    status = models.IntegerField(choices=status_choice)
    sendStatus = models.TextField(null=True,blank=True)
    createdAt = models.DateTimeField(auto_now_add=True)
    updatedAt = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['-createdAt', ]

    def __str__(self):
        return u'%s - %d' % (self.toUser,self.status)