# Generated by Django 2.1.5 on 2019-03-14 12:44

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0075_auto_20190314_1206'),
    ]

    operations = [
        migrations.AddField(
            model_name='company',
            name='uploaded',
            field=models.BooleanField(default=False),
        ),
    ]