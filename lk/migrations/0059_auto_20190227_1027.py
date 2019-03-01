# Generated by Django 2.1.5 on 2019-02-27 10:27

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0058_auto_20190226_1259'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userdetal',
            name='account',
        ),
        migrations.AddField(
            model_name='userdetal',
            name='company',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='lk.Company'),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='company',
            name='staff_users',
            field=models.ManyToManyField(blank=True, to=settings.AUTH_USER_MODEL),
        ),
    ]