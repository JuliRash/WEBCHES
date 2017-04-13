# a project is what keeps one motivated
from django.conf.urls import url
from . import views
from django.contrib.auth import views as auth_views
from django.contrib.auth.views import password_change_done, password_change

app_name = "cocoa"


urlpatterns = [

        url(r'^register/$', views.Register.as_view(), name='register'),
        url(r'^logout/$', views.Logoutview.as_view(), name='logout'),
        url(r'^farmers/$', views.search, name="farmers"),
        url(r'^$', views.nex, name="nex"),
        url(r'^not/$', views.error, name="error"),
        url(r'^password_change_done/$', password_change_done ,{'template_name': 'cocoa/admin_base.html'},name='password_change_done'),
        url(r'^password_change/$', password_change, {'template_name': 'cocoa/password.html', 'post_change_redirect': 'cocoa:password_change_done'}, name='password_change'),
        url(r'^login/$', auth_views.login, {'template_name': 'cocoa/login.html'}, name='login'),
        url(r'^agents/$', views.super, name="super"),
        url(r'^new/$', views.add_disease, name="new"),
        url(r'^all_diseases/$', views.view_diseases, name="view"),
        url(r'^contact/$', views.contact, name="contact"),
        url(r'^profile/$', views.update_profile, name="profile"),
        url(r'^about/$', views.AboutView.as_view(), name="about"),
        url(r'^disease/(?P<pk>[0-9]+)/$', views.details, name="details"),



]

# Learn Python and Django - Build an eCommerce Website Step by Step from Scratch 
