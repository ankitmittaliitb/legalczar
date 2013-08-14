from django.conf.urls import patterns, include, url

# Uncomment the next two lines to enable the admin:
from django.contrib import admin
admin.autodiscover()

urlpatterns = patterns('',
    # Examples:
    url(r'^$', 'mainsite.views.home', name='home'),
    # url(r'^legalczar/', include('legalczar.foo.urls')),

    # Uncomment the admin/doc line below to enable admin documentation:
    # url(r'^admin/doc/', include('django.contrib.admindocs.urls')),

    # Uncomment the next line to enable the admin:
    url(r'^admin/', include(admin.site.urls)),
    url(r'^accounts/', include('allauth.urls')), 
    url(r'^profile/edit/', 'mainsite.views.profile_edit'),


    url(r'^app/accounts/', include('allauth.urls')), 
    url(r'^app/profile/edit/', 'mainsite.views.profile_edit'),
)
