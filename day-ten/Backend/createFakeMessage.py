import os


os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chattuto.settings")

import django
django.setup()

from faker import factory, Faker
from chat.models import Chat,Message
from model_bakery.recipe import Recipe, foreign_key

fake = Faker()
for i in range(30):
    from random import randrange
    import time
    from datetime import datetime
    randomNumber = randrange(10)
    message = Message()
    message.refChat_id="66fdac13-79ff-4d0f-a0f2-7001708f51d5"
    print(randomNumber)
    if randomNumber<=5:
        #myself
        message.author_id="3cde3f7e-261e-4ebb-8437-fa4c27d35bf0"
    else:
        #the other user
        message.author_id = "fb261053-d336-4a9b-9bcc-d206ac4b7753"
    message.isRead=False
    now = datetime.now()  # current date and time
    # Add to texte for better debug purpose
    message.message = fake.sentence(nb_words=10)+":"+now.strftime("%H:%M:%S")
    message.save()
    # sleep a little to have different createdAt
    time.sleep(1)
