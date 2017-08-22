# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.views import generic

from models import Reservoir


# Create your views here.

def index(request):
    list = Reservoir.objects.all()
    context = {'all_revs': list}
    return render(request, 'index.html', context)

def details(req):
    # key = req.GET['id']
    # #single_rev = Reservoir.objects.get(id=key)
    # context = {'key': key}
    # return render(req, 'details.html', context)
    