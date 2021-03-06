# Generated by Django 2.1.5 on 2019-02-27 11:30

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0059_auto_20190227_1027'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='photo',
            name='account',
        ),
        migrations.RemoveField(
            model_name='stock',
            name='account',
        ),
        migrations.AddField(
            model_name='photo',
            name='company',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='lk.Company'),
            preserve_default=False,
        ),
        migrations.AddField(
            model_name='stock',
            name='company',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='lk.Company'),
            preserve_default=False,
        ),
    ]
