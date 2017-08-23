# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.db import models
from decimal import Decimal


# Create your models here.
class Reservoir(models.Model):
    name = models.CharField(max_length=30)
    lat = models.DecimalField(decimal_places=6, max_digits=8, default=Decimal('0.000000'))
    long = models.DecimalField(decimal_places=6, max_digits=9, default=Decimal('0.000000'))
    maxLevel = models.FloatField(default=0.00)
    addDate = models.DateField(auto_now_add=True)

    def __unicode__(self):
        return self.name