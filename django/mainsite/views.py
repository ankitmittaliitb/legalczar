# Create your views here.
from django.http import HttpResponse
from mainsite.models import LawyerProfile
from mainsite.forms import ProfileEditForm
from django.template import RequestContext, loader
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import UpdateView

def home(request ):
    #data = request.GET

    """try:
        page = Page.objects.get(pk=page_id)
    except Page.DoesNotExist:    
        raise Http404"""
    #'style':data['style']
    return render(request, 'mainsite/home.html', {'domain':request.META['HTTP_HOST']})

class MessageMixin():
    def get_object(self, queryset=None):
        """ Hook to ensure object is owned by request.user. """
        # obj = super(ProfileEdit, self).get_object()
        # if not obj.owner == self.request.user:
        #     raise Http404
        # return obj
        return self.request.user.get_profile()

       
class ProfileEdit(MessageMixin,UpdateView):
    model=LawyerProfile
    form_class = ProfileEditForm
    template_name = "mainsite/profile_edit.html"
    success_url = "app/profile/"
    redirect_field_name = None

    

    """ def form_valid(self, form):
        success_url = self.get_success_url()
        return form.login(self.request, redirect_url=success_url)

    def get_success_url(self):
        # Explicitly passed ?next= URL takes precedence
        ret = (get_next_redirect_url(self.request,
                                     self.redirect_field_name)
               or self.success_url)
        return ret

    def get_context_data(self, **kwargs):
        ret = super(LoginView, self).get_context_data(**kwargs)
        ret.update({
                "signup_url": passthrough_next_redirect_url(self.request,
                                                            reverse("account_signup"),
                                                            self.redirect_field_name),
                "site": Site.objects.get_current(),
                "redirect_field_name": self.redirect_field_name,
                "redirect_field_value": self.request.REQUEST.get(self.redirect_field_name),
                })
        return ret"""

profile_edit = ProfileEdit.as_view()

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