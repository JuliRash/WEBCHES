from django import forms
from webches.models import User, Disease, Contact


class USerForm(forms.ModelForm):
    password = forms.CharField(widget=forms.PasswordInput())

    class Meta:
        model = User
        fields = ['username', 'first_name',
                  'last_name', 'email', 'password', 'picture']


class UpdateUser(forms.ModelForm):
    phone_number = forms.CharField(
        widget=forms.TextInput(attrs={'placeholder': '+234'}))

    class Meta:
        model = User
        fields = ['username', 'email', 'bio', 'website',
                  'picture', 'phone_number', 'first_name']


class Add(forms.ModelForm):

    class Meta:
        model = Disease
        fields = ['Disease_Name', 'details', 'symptoms', 'image',
                  'solutions', 'Disease_Category',
                  'referrals', 'botanical_name'
                  ]


class ContactForm(forms.ModelForm):

    class Meta:
        model = Contact
        fields = ['subject', 'message']


class Home(forms.ModelForm):

    class Meta:
        model = Contact
        fields = ['name', 'email', 'message']


class UpdateDisease(forms.ModelForm):

    class Meta:
        model = Disease
        fields = ['Disease_Name', 'details', 'symptoms', 'image',
                  'solutions', 'Disease_Category',
                  'referrals', 'botanical_name'
                  ]
