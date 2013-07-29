# Create your views here.
from django.http import HttpResponse
#from guide.models import Level,Page
from django.template import RequestContext, loader
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required


def home(request ):
    data = request.GET

    """try:
        page = Page.objects.get(pk=page_id)
    except Page.DoesNotExist:    
        raise Http404"""
    return render(request, 'mainsite/home.html', {'domain':request.META['HTTP_HOST'], 'style':data['style']})



"""
@login_required
def page(request, page_id ):
    try:
        page = Page.objects.get(pk=page_id)
    except Page.DoesNotExist:    
        raise Http404
    return render(request, 'guide/page.html', {'page': page})

@login_required
def levelwpage(request, level_id, page_id ):
    try:
        level = Level.objects.get(pk=int(level_id))
        page = Page.objects.filter(level__id=int(level_id)).order_by('sortorder')[int(page_id)-1]         
    except Page.DoesNotExist:    
        raise Http404
    return render(request, 'guide/page.html', {'page': page})

@login_required
def level(request, level_id):
    try:
        level = Level.objects.get(pk=level_id)
    except Level.DoesNotExist:
        raise Http404
    return render(request, 'guide/level.html', {'level': level})
# Create your views here.
"""