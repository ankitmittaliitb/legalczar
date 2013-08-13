from django.contrib import admin
from mainsite.models import *

############################################
#
#   Lawyer Account Admin
#
############################################
class LawyerAdmin(admin.ModelAdmin):
    pass
   # filter_horizontal = ('practice_areas','practice_court')



admin.site.register((ClientProfile,PracticeArea,PracticeCourt) )
admin.site.register(LawyerProfile, LawyerAdmin)
