# Generated by Django 2.1.5 on 2019-02-14 08:36

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0053_auto_20190214_0835'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetal',
            name='photo',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to='lk.Photo'),
        ),
    ]