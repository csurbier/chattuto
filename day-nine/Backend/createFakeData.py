import os

os.environ.setdefault("DJANGO_SETTINGS_MODULE", "chattuto.settings")

import django

django.setup()

from faker import factory, Faker
from chat.models import *
from model_bakery.recipe import Recipe, foreign_key

fake = Faker()

for k in range(100):
    user = Recipe(User,
                  first_name=fake.first_name(),
                  last_name=fake.last_name(),
                  email=fake.email(),
                  is_active=True,
                    createdAt=fake.future_datetime(end_date="+30d", tzinfo=None),
                    updatedAt=fake.future_datetime(end_date="+30d", tzinfo=None), )
    user.make()