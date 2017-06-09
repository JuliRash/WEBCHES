
# Create your views here.


from django.shortcuts import render, redirect, get_object_or_404 
from django.http import HttpResponseRedirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic.edit import UpdateView
from django.views.generic import View, TemplateView
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from .models import Disease, Category
from .forms import USerForm, Add, ContactForm, Home
from django.contrib.auth.decorators import login_required
from .forms import UpdateUser, UpdateDisease
from django.contrib import messages

# Create your views here.


class Register(View):
    form_class = USerForm
    template_name = "cocoa/register.html"

    def get(self, request):
        form = self.form_class(None)
        return render(request, self.template_name, {'form': form})

    def post(self, request):
        form = self.form_class(request.POST, request.FILES)

        if form.is_valid():

            user = form.save(commit=False)

            # cleaned (normalized) data
            username = form.cleaned_data['username']
            password = form.cleaned_data['password']
            user.set_password(password)
            user.save()

            # authenticate user if credentials are correct
            user = authenticate(username=username, password=password)

            if user is not None:

                if user.is_active:
                    login(request, user)
                    return redirect('cocoa:super')
        return render(request, self.template_name, {'form': form})


class Logoutview(View):
    def get(self, request):
        logout(request)
        return HttpResponseRedirect('/login')


class AboutView(TemplateView):
    template_name = "cocoa/about.html"


def search(request):
    if request.method == "POST":
        search_text = request.POST['search_text']
    else:
        search_text = ""

    disease_list = Disease.objects.filter(
        symptoms__contains=search_text, status=Disease.published)

    page = request.GET.get('page', 3)
    paginator = Paginator(disease_list, 3)

    try:
        disease = paginator.page(page)
    except PageNotAnInteger:
        disease = paginator.page(1)
    except EmptyPage:
        disease = paginator.page(paginator.num_pages)
    data = {'disease': disease}
    return render(request, "cocoa/search.html", data)


@login_required(login_url="/login")
def super(request):
    cat = Category.objects.all()
    dis = Disease.objects.all()
    new = Disease.objects.latest('Disease_Name')
    return render(request,
                  "cocoa/admin_base.html", {
                      'cat': cat, 'dis': dis, 'new': new})


def details(request, pk):
    Diss = get_object_or_404(Disease, pk=pk)
    return render(request, "cocoa/details.html", {'Diss': Diss})


# user management #
@login_required(login_url="/login/")
def update_profile(request):
    if request.method == 'POST':
        form = UpdateUser(request.POST, request.FILES, instance=request.user)
        if form.is_valid():
            user = form.save(commit=False)
            messages.success(
                request, ('your profile has been updated successfully'),
                extra_tags='alert')
            user.save()
            return redirect('cocoa:super')
        else:
            form = UpdateUser(instance=request.user)
            messages.error(
                request, ('unable to update profile correct the errors'),
                extra_tags="alert")
            return render(request, "profile.html", {'form': form})
    else:
        form = UpdateUser(instance=request.user)
        return render(request, "profile.html", {'form': form})


@login_required(login_url="/login")
def add_disease(request):
    if request.method == "POST":
        form = Add(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            messages.success(
                request, ('you have successfully added a new disease'))
            return redirect('cocoa:super')
        else:
            form = Add()
            return render(request, "new.html", {'form': form})
    else:
        form = Add()
        return render(request, "new.html", {'form': form})


@login_required(login_url="/login")
def view_diseases(request):
    obj = Disease.objects.all().filter(status=Disease.published)
    return render(request, "view.html", {'obj': obj})


def error(request):
    return render(request, "cocoa/404.html")


@login_required(login_url="/login")
def contact(request):
    form = ContactForm()
    if request.method == 'POST':
        form = ContactForm(request.POST)
        if form.is_valid():
            form.save()
            messages.success(
                request,
                ('your message was successfully to sent'))
            return redirect('cocoa:super')
        else:
            form = ContactForm()
            return render(request, "contact", {'form': form})
    return render(request, "contact.html", {'form': form})


# error handlers view
def page_not_found_view(request):
    return render(request, "cocoa/404.html")


def server_not_found_view(request):
    return render(request, "cocoa/500.html")


def nex(request):
    form = Home()
    if request.method == 'POST':
        form = Home(request.POST)
        if form.is_valid():
            form.save()
            return redirect('cocoa:nex')
        else:
            form = Home()
            return render(request, "contact.html", {'form': form})
    return render(request, "cocoa/new.html", {'form': form})


class UpdateDisease(LoginRequiredMixin, UpdateView):
    form_class = UpdateDisease
    template_name = "update.html"
    model = Disease

    def get_object(self, *args, **kwargs):
        obj = get_object_or_404(Disease, pk=self.kwargs['pk'])
        return obj

    def form_valid(self, form):
        form.save()
        messages.success(
            self.request, "you have successfully updated the tutorial")
        return redirect('/all_diseases')
