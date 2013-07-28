from django.db import models
from tinymce.models import HTMLField
from django.forms.models import model_to_dict
from django.contrib.auth.models import User

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

class PracticeArea(models.Model):
    area = models.CharField(max_length=250)
    
    def __unicode__(self):
        return unicode(self.area)

class PracticeCourt(models.Model):
    court = models.CharField(max_length=250)
    level = models.CharField(max_length=2, choices=COURT_LEVEL)

    def __unicode__(self):
        return unicode(self.court + ',' + self.level)
 
class LawyerAccount(models.Model):
    user = models.OneToOneField(User)      
    practice_areas = models.ManyToManyField(PracticeArea)
    practice_court = models.ManyToManyField(PracticeCourt)
    phone_number = models.IntegerField(blank=True, null=True)
    professional_summary = HTMLField(blank=True,null=True)
    profile_photo = models.ImageField(upload_to='images/p/')
    zip_code = models.IntegerField(blank=True,null=True)
    bar_id = models.CharField(max_length=100)
    hourly_fee = models.IntegerField(blank=True,null=True)
    halfhour_fee = models.IntegerField(blank=True,null=True)

    status =  models.CharField(max_length=2, choices=STATUS_CHOICES,default='PB')

    def __unicode__(self):
        return unicode(self.user)
