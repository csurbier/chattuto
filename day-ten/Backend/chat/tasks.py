from __future__ import absolute_import

import json

from celery import Celery
#from celery.schedules import crontab
from chattuto import settings
from chat.models import *
import logging
from fcm_django.models import FCMDevice
app = Celery('chattuto', broker=settings.BROKER_URL)

# Get an instance of a logger
logger = logging.getLogger('django')

@app.task(bind=True,ignore_result=True)
def task_check_notifications(self):
    logger.info("============== BEGIN TASK CELERY: task_check_notifications Instance")
    notifications = Notifications.objects.filter(status=0).select_related("userNotif")
    for notif in notifications:
        devices = FCMDevice.objects.filter(active=True, user=notif.toUser).select_related("user")
        # send message to each user device
        status = None
        for device in devices:
            status = device.send_message(title="Chattuto", body=notif.message, badge=1,
                                         data={"title": "Chattuto", "body": notif.message},
                                         sound="default")
        if status["success"] == 1:
            notif.status = 2
        else:
            notif.status = 3
        notif.sendStatus = json.dumps(status)
        notif.save()

    logger.info("============== END TASK CELERY: task_check_notifications Instance")
    return