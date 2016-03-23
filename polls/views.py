from django.shortcuts import render

# Create your views here.
#Another comment
from django.http import HttpResponse

from .models import Person, Post, FacebookPost

import logging

def index(request):
    return render(request, 'polls/index.html')


def savePerson(request):
    fb = request.POST['FB']
    tw = request.POST['Twitter']
    inst = request.POST['Instagram']
    forname = request.POST['forname']
    surname = request.POST['surname']
    
    if Person.objects.filter(usernameFB=fb).count() !=0:
        return HttpResponse('success')
    
    person = Person(usernameFB=fb, usernameTwitter=tw, usernameInstagram=inst, forname=forname, surname=surname)

    person.save()
    return HttpResponse('success')
    
def saveFB(request):
    usernameFB = request.POST['FB']
    person = Person.objects.get(usernameFB=usernameFB)
    countOfPosts = person.countOfPosts +1 
    
    message = request.POST['message']
    published = request.POST['created_time']
    idPost = request.POST['id']
    
    post = Post(person=person, message=message, published=published)
    post.save()
    
    fbPost = FacebookPost(post=post, idPost=idPost)
    
    
    fbPost.save() 

    return HttpResponse('success')
