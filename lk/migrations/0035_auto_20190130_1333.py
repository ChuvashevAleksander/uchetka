# Generated by Django 2.1.5 on 2019-01-30 13:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0034_auto_20190130_1259'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdetal',
            name='photo',
            field=models.ImageField(upload_to='detals'),
        ),
    ]
