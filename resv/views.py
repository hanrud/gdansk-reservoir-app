# -*- coding: utf-8 -*-
from __future__ import unicode_literals
from django.shortcuts import render
from django.shortcuts import get_object_or_404

from models import Reservoir


# Create your views here.

def index(request):
    list = Reservoir.objects.all()
    context = {'all_revs': list}
    return render(request, 'index.html', context)

def details(request, pk):
    resv = get_object_or_404(Reservoir, pk=pk)
    return render(request, 'details.html', {'resv': resv, 'lat': resv.lat, 'long':resv.long, 'max':resv.maxLevel})



