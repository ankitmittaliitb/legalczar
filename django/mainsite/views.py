# Create your views here.
from django.http import HttpResponse
from mainsite.models import *
from mainsite.forms import ProfileEditForm, ReviewForm
from django.template import RequestContext, loader
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseRedirect, HttpResponse
from django.core.urlresolvers import reverse
from django.contrib.auth.decorators import login_required
from django.views.generic.edit import UpdateView, CreateView
import random

def home(request ):
    #data = request.GET

    """try:
        page = Page.objects.get(pk=page_id)
    except Page.DoesNotExist:    
        raise Http404"""
    #'style':data['style']

    if not request.session.has_key('lock_key'):
        request.session['lock_key'] = random.randint(101, 899)

    if request.session['lock_key'] + 100 == int(request.POST.get('lock_key', 0)):
        request.session['logged'] = 1

    if not request.session.has_key('logged'):
        return render(request, 'mainsite/login.html', {'domain':request.META['HTTP_HOST']})

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
    model=BaseProfile
    form_class = ProfileEditForm
    template_name = "mainsite/profile_edit.html"
    success_url = "/app/profile/"
    redirect_field_name = None

profile_edit = login_required(ProfileEdit.as_view())


@login_required    
def profile_view(request,username=''):
    
    if(username==''):
        user = request.user
    else:
        user = User.objects.get(username=username);
    profile = user.get_profile()

    return render(request, 'mainsite/profile.html', {'domain':request.META['HTTP_HOST'], 'profile':profile})


class ReviewCreate(CreateView):
    model = Review
    form_class = ReviewForm    
    template_name = "mainsite/review.html"
    success_url = "/app/profile/"
    redirect_field_name=None

    def get_form(self, form_class):
        form = super(ReviewCreate, self).get_form(form_class)
        form.instance.lawyer = get_object_or_404(User, username=self.kwargs['lawyer'])
        form.instance.user = self.request.user
        return form

review = login_required(ReviewCreate.as_view())

# @login_required
# def review(request):
#     data = request.GET
#     course = get_object_or_404(Course, pk=int(data['course_id']))  
#     #user = get_object_or_404(User, username__exact=
#     try:
#         review = Review(course=course, user=request.user, subject=data['subject'], review=data['review'], 
#                         rating_overall=int(data['rating_overall']), rating_difficulty=int(data['rating_difficulty']), 
#                         rating_entertainment=int(data['rating_entertainment']), student_status=data['student_status'] )   
#         review.save()                        
#         json = simplejson.dumps( { 'status' : 'done' } )
#     except Course.DoesNotExist:
#         raise Http404    
#     response = HttpResponse(json,content_type='application/json',mimetype='application/json')
#     response['Access-Control-Allow-Origin'] = "*"
#     return response

