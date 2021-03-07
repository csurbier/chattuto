from django.contrib import admin

from chat.models import *


class ChatAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['fromUser','toUser']}),
    ]
    list_display = ('fromUser','toUser','createdAt','updatedAt',)
    search_fields = ('fromUser__email','toUser__email','fromUser__last_name','toUser__last_name',)
    raw_id_fields = ('fromUser','toUser',)
    list_select_related = ('fromUser','toUser',)


class MessageAdmin(admin.ModelAdmin):
    fieldsets = [
        (None, {'fields': ['refChat','message','author','isRead','type','extraData']}),
    ]
    list_display = ('refChat','message','author','isRead','createdAt',)
    ordering = ('-createdAt',)
    search_fields = ('message','author__email',)
    raw_id_fields = ('author',)
    list_select_related = ('refChat','author',)

# Register your models here.
admin.site.register(Chat,ChatAdmin)
admin.site.register(Message,MessageAdmin)
