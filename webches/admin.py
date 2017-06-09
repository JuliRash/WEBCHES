from django.contrib import admin
from webches.models import Disease, Category, Referrals, User, Contact
# Register your models here.


class DiseaseAdmin(admin.ModelAdmin):
    list_display = ['Disease_Name', 'Disease_Category', 'symptoms']
    list_filter = ['Disease_Name', 'Disease_Category']
    fields = ['Disease_Name', 'Disease_Category',
              'symptoms', 'image', 'solutions',
              'botanical_name', 'referrals', 'details', 'status']
    search_fields = ['Disease_Name', 'symptoms']


class CategoryAdmin(admin.ModelAdmin):
    list_display = ['cat_name']


class RefAdmin(admin.ModelAdmin):
    list_display = ['name', 'url', 'info']
    fields = ['name', 'url', 'info']


class UserAdmin(admin.ModelAdmin):
    list_display = ['username', 'first_name', 'last_name', 'bio']
    list_filter = ['username', 'first_name', 'email']
    search_fields = ['username', 'email']


class ContactAdmin(admin.ModelAdmin):
    list_display = ['message', 'subject', 'name', 'date_sent']
    list_filter = ['subject', 'message']


admin.site.register(Disease, DiseaseAdmin)
admin.site.register(Category, CategoryAdmin)
admin.site.register(Referrals, RefAdmin)
admin.site.register(User, UserAdmin)
admin.site.register(Contact, ContactAdmin)
