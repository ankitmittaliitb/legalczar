from django import forms
from mainsite.models import *
from localflavor.in_.forms import INStateSelect, INZipCodeField, INPhoneNumberField
from localflavor import generic
from django.forms.extras.widgets import  SelectDateWidget
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserChangeForm

class SignupForm(forms.Form):
    profile = forms.BooleanField(label='Are you a Lawyer?',required=False, 
    								widget=forms.CheckboxInput(attrs={"onchange": "$('#id_barid').toggle(this.checked);"} ) )
    barid = forms.CharField(max_length=100,required=False,label='', widget=forms.TextInput(attrs={'placeholder':'BAR ID', 'style':"display:none"}))

    def clean_barid(self):    
        if(self.data.get('profile', False )  and (self.cleaned_data['barid']=='')):    	
        	raise forms.ValidationError(u'BAR ID value required for Lawyer Signup' )
        else:
            return self.cleaned_data['barid']

    def save(self,user):
        user.save()
        if(self.cleaned_data['profile']):        	
        	lp = LawyerProfile(user=user,profile='lawyer',bar_id=self.cleaned_data['barid'])
        	lp.save()
        else:
        	cp = ClientProfile(user=user,profile='client')
        	cp.save()

"""
class UserForm(forms.ModelForm):
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')

class ProfileEditForm(forms.ModelForm):
    # first_name =  forms.CharField(max_length=100,required=False,label='First Name', widget=forms.TextInput())
    # last_name = forms.CharField(max_length=100,required=False,label='Last Name', widget=forms.TextInput())
    landline =INPhoneNumberField()
    mobile = INPhoneNumberField()
    zipcode = INZipCodeField()
    practice_areas =forms.CheckboxSelectMultiple(),
    practice_court =forms.CheckboxSelectMultiple(),

    class Meta:
        model = LawyerProfile
        exclude = ['user', 'profile', 'status']
        help_texts = {
        	'practice_court':'a',
        	'practice_areas':'a',
        }
        widgets = {
        	'state':INStateSelect(),
        	# 'practice_areas':forms.CheckboxSelectMultiple(),
        	# 'practice_court':forms.CheckboxSelectMultiple(),
        	# # 'gender': forms.RadioSelect(),
            # 'name': Textarea(attrs={'cols': 80, 'rows': 20}),
        }

        

    def __init__(self, *args, **kwargs):
    	self.user = kwargs['instance'].user
    	user_kwargs = kwargs.copy()
    	user_kwargs['instance']=self.user
    	self.uf=UserForm(*args,**user_kwargs)

    	super(ProfileEditForm, self).__init__(*args, **kwargs)
        self.fields.update(self.uf.fields)
        self.initial.update(self.uf.initial)
        field_order = ['first_name',
            'last_name',
            'email',
            'gender', ]
        other_field_order = [ f for f in self.fields.keyOrder
                              if f not in field_order ]

        self.fields.keyOrder = field_order + other_field_order
                     
    # def clean(self):
    #     cleaned_data = super(ProfileEditForm, self).clean()
    #     self.errors.update(self.UserForm.errors)
    #     return cleaned_data

    def save(self, commit=True):
        self.UserForm.save(commit)
        return super(ProfileEditForm, self).save(commit)
"""
#fields = ('username', 'first_name', 'last_name', 'email')

class UserForm(forms.ModelForm):
    # username = forms.CharField(max_length=30, required=True,
    #                             help_text="alphanumberic and @.+-_ ")
    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'email')
        
class LawyerForm(forms.ModelForm):
    class Meta:
        model = LawyerProfile
        fields = ['practice_areas', 'practice_court', 'professional_summary',  'bar_id', 'halfhour_fee', 'hourly_fee' ]
        
class ClientForm(forms.ModelForm):
    interest_areas = forms.CheckboxSelectMultiple()
    class Meta:
        model = ClientProfile
        fields = ['interest_areas']
        widgets = {
        	'interest_areas':forms.CheckboxSelectMultiple()          	
        }

class ProfileEditForm(forms.ModelForm):
    # first_name =  forms.CharField(max_length=100,required=False,label='First Name', widget=forms.TextInput())
    # last_name = forms.CharField(max_length=100,required=False,label='Last Name', widget=forms.TextInput())
    landline =INPhoneNumberField(required=False)
    mobile = INPhoneNumberField(required=False)
    zipcode = INZipCodeField()   

    class Meta:
        model = BaseProfile
        exclude = ['user', 'profile']
        
        widgets = {
        	'state':INStateSelect(),        	
        	# # 'gender': forms.RadioSelect(),
            # 'name': Textarea(attrs={'cols': 80, 'rows': 20}),
        }

        

    def __init__(self, *args, **kwargs):
    	self.user = kwargs['instance'].user
    	user_kwargs = kwargs.copy()
    	user_kwargs['instance']=self.user
    	self.uf=UserForm(*args,**user_kwargs)

    	self.profile = kwargs['instance'].profile
    	lcf_kwargs = kwargs.copy()

    	if (self.profile == 'client'):    		
    		self.lcf=ClientForm(*args,**user_kwargs)
    	else:
    		self.lcf=LawyerForm(*args,**user_kwargs)


    	super(ProfileEditForm, self).__init__(*args, **kwargs)
        self.fields.update(self.uf.fields)
        self.initial.update(self.uf.initial)

        self.fields.update(self.lcf.fields)
        self.initial.update(self.lcf.initial)

        field_order = ['username', 'first_name',
            'last_name',
            'email',
            'gender', ]
        other_field_order = [ f for f in self.fields.keyOrder
                              if f not in field_order ]

        self.fields.keyOrder = field_order + other_field_order
                     
    def clean(self):
         cleaned_data = super(ProfileEditForm, self).clean()
         self.errors.update(self.uf.errors)
         return cleaned_data

    def save(self, commit=True):
        self.uf.save(commit)
        self.lcf.save(commit)
        return super(ProfileEditForm, self).save(commit)