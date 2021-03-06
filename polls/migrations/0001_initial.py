# -*- coding: utf-8 -*-
# Generated by Django 1.9.4 on 2016-03-31 17:15
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='comment',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='FacebookPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('idPost', models.CharField(default=0, max_length=100)),
                ('likes', models.IntegerField(default=0)),
                ('shares', models.IntegerField(default=0)),
                ('countComment', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='hashtag',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='InstagramPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200)),
                ('likes', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='link',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200)),
            ],
        ),
        migrations.CreateModel(
            name='Person',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('usernameFB', models.CharField(max_length=200)),
                ('usernameTwitter', models.CharField(max_length=200)),
                ('usernameInstagram', models.CharField(max_length=200)),
                ('forname', models.CharField(max_length=100)),
                ('surname', models.CharField(max_length=100)),
                ('countOfPosts', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.TextField(default='')),
                ('published', models.DateTimeField(verbose_name='date published')),
                ('idPost', models.CharField(default=0, max_length=100)),
                ('person', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Person')),
            ],
        ),
        migrations.CreateModel(
            name='TwitterPost',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('url', models.CharField(max_length=200)),
                ('likes', models.IntegerField(default=0)),
                ('retweet', models.IntegerField(default=0)),
                ('post', models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to='polls.Post')),
            ],
        ),
        migrations.AddField(
            model_name='link',
            name='posts',
            field=models.ManyToManyField(to='polls.Post'),
        ),
        migrations.AddField(
            model_name='instagrampost',
            name='post',
            field=models.OneToOneField(default=0, on_delete=django.db.models.deletion.CASCADE, to='polls.Post'),
        ),
        migrations.AddField(
            model_name='hashtag',
            name='posts',
            field=models.ManyToManyField(to='polls.Post'),
        ),
        migrations.AddField(
            model_name='comment',
            name='post',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='polls.Post'),
        ),
    ]
