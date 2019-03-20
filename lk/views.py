import json
import random
import requests

from django.contrib.auth.models import User
from django.shortcuts import render, redirect
from django.contrib.auth import logout
from django.http import HttpResponse

from .models import *

# Подгрузка каталогов
def load_cats(request):
	data = {'key':'283R8Q8ckCYq9cyQSgYiXDpYFguSf7ox', 'group': 'passenger'}
	print(request.POST)
	if request.is_ajax():
		if request.POST['cat'] == 'getModels':
			data.update({'act': 'getModels', 'make': request.POST['mark']})
		elif request.POST['cat'] == 'getCars':
			data.update({'act': 'getCars', 'make': request.POST['mark'], 'model': request.POST['model']})
	r = requests.post('https://partsapi.ru/api.php', data=data)
	return HttpResponse(json.dumps(json.loads(r.content)), content_type="application/json")

def logout_lk(request):
	logout(request)
	return redirect('/')

def rediredct_detal_list_page(request):
	if request.user.username == 'admin':
		return redirect('/admin/')
	else:
		return redirect('/lk/detals_list/')


def add_random_detal(request):
	for i in range(50000):
		UserDetal.objects.create(
			title=AutoDetal.objects.all()[random.randint(0, 19)].title,
			donor_info=AutoDonor.objects.all()[random.randint(0, 14)],
			price=random.randint(1000, 20000),
			stockroom=Stock.objects.get(title='Авторазбор №1'),
			company=Company.objects.get(title='Разбор-маркет')
		)
		print('Добавленно деталей '+str(i))
	return redirect('/lk/detals_list/')

def add_marks(required):
	with open('lk/marks.json', 'r', encoding='utf-8') as file:
		marks = json.loads(file.read())
	for mark in marks:
		AutoMark.objects.create(
			title=mark['name'],
			value=mark['id']
		)
	return redirect('/lk/detals_list/')

def add_random_donor(request):
	def get_data(param_load):
		data = {'key':'283R8Q8ckCYq9cyQSgYiXDpYFguSf7ox', 'group': 'passenger'}
		data.update(param_load)
		r = requests.post('https://partsapi.ru/api.php', data=data)
		return r.content

	for i in range(15):
		mark = AutoMark.objects.all()[random.randint(1,100)]
		all_model = json.loads(get_data({'act': 'getModels', 'make': mark.value}))
		model = all_model[random.randint(0, len(all_model)-1)]
		# all_gen = json.loads(get_data({'act': 'getCars', 'make': mark.value, 'model': model['id']}))
		# gen = all_gen[0]
		print(mark.title + ' ' + model['name'])
		AutoDonor.objects.create(
			mark=mark,
			model=model['name'],
			generation='1'
		)
	return redirect('/lk/detals_list/')