# Generated by Django 2.1.5 on 2019-01-16 11:04

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0009_autodonor'),
    ]

    operations = [
        migrations.CreateModel(
            name='StockRoomTest',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('price', models.IntegerField()),
                ('description', models.TextField()),
                ('detail', models.ForeignKey(on_delete=django.db.models.deletion.PROTECT, to='lk.AutoDetailTest')),
                ('donor_info', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='lk.AutoDonor')),
            ],
        ),
    ]