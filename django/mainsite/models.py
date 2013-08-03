from django.db import models
from tinymce.models import HTMLField
from django.forms.models import model_to_dict
from django.contrib.auth.models import User
from django.utils.translation import pgettext, ugettext_lazy as _, ugettext
# from django.contrib.localflavor.in_.models import INStateField, INZipCodeField, INStateSelect

STATUS_CHOICES = (
        ('FT', 'Feature'),
        ('AP', 'Approved'),
        ('DR', 'Dropped'),
        ('WA', 'Waiting Approval'),
    )

COURT_LEVEL = (
        ('DS', 'District Court' ),
        ('HG', 'High Court' ),
        ('SU', 'Supreme Court' ),
)


# class PhoneNumber(models.Model):
#     number = models.CharField(max_length=15)
    
#     def __unicode__(self):
#         return unicode(self.number)  

class BaseProfile(models.Model):
    PROFILE_CHOICES = (('lawyer','lawyer'),('client','client'))
    GENDER_CHOICE = (('M', 'Male'), ('F', 'Female'))

    user = models.OneToOneField(User)
    profile = models.CharField (max_length=10, choices=PROFILE_CHOICES )
    profile_photo = models.ImageField(upload_to='images/p/', blank = True, null=True)
    landline = models.CharField(max_length=15, blank = True )
    mobile = models.CharField(max_length=15, blank = True)
    # phone_number = models.OneToManyField(PhoneNumber)
    gender = models.CharField(max_length = 1, choices = GENDER_CHOICE, null = True)

    # address = models.OneToOneField(Address)
    
    # class Adress(models.Model)
    street_line1 = models.CharField(_('Address 1'), max_length = 128, blank = True)
    street_line2 = models.CharField(_('Address 2'), max_length = 128, blank = True)
    
    zipcode = models.CharField(_('ZIP code'), max_length = 10, blank = True)
    city = models.CharField(_('City'), max_length = 64, blank = True)
    state = models.CharField(_('State'), max_length = 4, blank = True)

    def get_absolute_url(self):
        return ('profiles_profile_detail', (), { 'username': self.user.username })
    get_absolute_url = models.permalink(get_absolute_url)

class PracticeArea(models.Model):
    area = models.CharField(max_length=250)
    
    def __unicode__(self):
        return unicode(self.area)

class PracticeCourt(models.Model):
    court = models.CharField(max_length=250)
    level = models.CharField(max_length=2, choices=COURT_LEVEL)

    def __unicode__(self):
        return unicode(self.court + ',' + self.level)
 
class LawyerProfile(BaseProfile):
    practice_areas = models.ManyToManyField(PracticeArea,help_text='', blank = True )
    practice_court = models.ManyToManyField(PracticeCourt,help_text='',  blank = True )
    
    professional_summary = HTMLField(blank=True,null=True)
        
    bar_id = models.CharField(max_length=100)
    halfhour_fee = models.IntegerField(blank=True,null=True)
    hourly_fee = models.IntegerField(blank=True,null=True)    

    status =  models.CharField(max_length=2, choices=STATUS_CHOICES,default='AP')

    def __unicode__(self):
        return unicode(self.user)

class ClientProfile(BaseProfile):
    interest_areas = models.ManyToManyField(PracticeArea,blank=True)    

    def __unicode__(self):
        return unicode(self.user)
