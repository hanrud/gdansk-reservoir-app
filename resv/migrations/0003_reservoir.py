# -*- coding: utf-8 -*-
# Generated by Django 1.11.4 on 2017-08-22 09:26
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('resv', '0002_delete_reservoir'),
    ]

    operations = [
        migrations.CreateModel(
            name='Reservoir',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=30)),
                ('addDate', models.DateField(auto_now_add=True)),
            ],
        ),
    ]
