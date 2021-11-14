# Generated by Django 3.1.7 on 2021-08-18 09:32

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_user_online'),
    ]

    operations = [
        migrations.CreateModel(
            name='Notifications',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(blank=True, max_length=1024, null=True)),
                ('status', models.IntegerField(choices=[(0, 'TO_SEND'), (1, 'SENDING'), (2, 'SENT'), (3, 'ERROR_SENDING'), (4, 'NO_PUSH_TOKEN'), (5, 'SEND_PUSH_DISABLE')])),
                ('sendStatus', models.TextField(blank=True, null=True)),
                ('createdAt', models.DateTimeField(auto_now_add=True)),
                ('updatedAt', models.DateTimeField(auto_now=True)),
                ('toUser', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='userNotif', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-createdAt'],
            },
        ),
    ]