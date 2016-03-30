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
        Person.objects.get(usernameFB=fb).delete()
    
    person = Person(usernameFB=fb, usernameTwitter=tw, usernameInstagram=inst, forname=forname, surname=surname)

    person.save()
    return HttpResponse('success')
    
def savePost(request):
    usernameFB = request.POST['FB']
    person = Person.objects.get(usernameFB=usernameFB)
    countOfPosts = person.countOfPosts +1 
    person.save() 
    
    message = request.POST['message']
    published = request.POST['created_time']
    idPost = request.POST['id']
   
    
    post = Post(person=person, message=message, published=published, likes=8)
    post.save()
    
def saveFB(request):
    idPost = request.POST['id']
    likes = request.POST['likes']
    fbPost = FacebookPost(post=post, idPost=idPost, likes=likes)
    
    
    fbPost.save() 

    return HttpResponse('success')
