# Generated by Django 2.1.5 on 2019-02-07 10:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0049_autodetalmaingroup'),
    ]

    operations = [
        migrations.CreateModel(
            name='AutoDetalSubgroupLevel1',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=80)),
                ('main_group', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='lk.AutoDetalMainGroup')),
            ],
        ),
    ]
