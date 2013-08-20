from django.conf.urls import patterns, include, url
import os.path
import settings

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

append = r'^app/' if os.path.isfile('local.pyc') else r'^';
    	 
urlpatterns = patterns('',
    # Examples:
    url(append+r'$', 'mainsite.views.home', name='home'),    
    # url(r'^legalczar/', include('legalczar.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    
    url(r'^admin/', include(admin.site.urls)),
    url(append+r'accounts/', include('allauth.urls')), 
    url(append+r'profile/edit/', 'mainsite.views.profile_edit'),    
    url(append+r'profile/(?P<username>.+)/', 'mainsite.views.profile_view'),    
    url(append+r'profile/', 'mainsite.views.profile_view'),
    url(append+r'avatar/', include('avatar.urls')),

)

if os.path.isfile('local.pyc'):    
    urlpatterns += patterns('',
    (r'^media/(?P<path>.*)$', 'django.views.static.serve', {
    'document_root': settings.MEDIA_ROOT}))
