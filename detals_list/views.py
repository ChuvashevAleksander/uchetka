import json
import requests

from django.core.paginator import Paginator
from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import View
from collections import OrderedDict

from .forms import *
from lk.forms import *
from lk.models import *
from stocks.forms import *


class DetalList(View):
	# GET Запрос	
	def get(self, request):
		num_page = request.GET.get('page', 1)
		if num_page == '0': 
			num_page = 1
		company = Company.objects.filter(staff_users=request.user)
		detals_company = UserDetal.objects.filter(company=company[0]).order_by('id')
		query_result = Paginator(detals_company, 25)
		return self.render_template(request, query_result, num_page)

	# POST Запрос
	def post(self, request):
		print(request.POST)
		if request.is_ajax():
			if request.POST['type'] == 'load_cats':
				data = self.load_cats(request)
			elif request.POST['type'] == 'add_to_upload':
				data = self.add_to_upload(request)
			elif request.POST['type'] == 'delete_in_upload':
				data = self.delete_in_upload(request)
			elif request.POST['type'] == 'clear_upload_list':
				data = self.clear_upload_list(request)
			elif request.POST['type'] == 'load_ajax_page':
				data =  self.load_ajax_page(request)	
			elif request.POST['type'] == 'filter_ajax':
				query_result =  self.filter_detals(request)
				
				data = self.generation_dict_detals(request, query_result)
			return HttpResponse(json.dumps(data), content_type="application/json")
		else:
			query_result = self.filter_detals(request)
			return self.render_template(request, query_result)

	# Генерация словаря деталей		
	def generation_dict_detals(self, request, query_result, num_page=1):
		query_result = {'new_detals': [{'id': elem.id,
										'title': elem.title,
										'price': elem.price,
										'description': elem.description,
										'stockroom': elem.stockroom.title,
										'photo': elem.photo.photo.url,
										'uploaded': elem.uploaded,
										'donor': {'mark': elem.donor_info.mark.title,
												  'model': elem.donor_info.model,
												  'generation': elem.donor_info.generation}
										} for elem in query_result.page(num_page).object_list ] }
		return query_result

	# Фильтрация деталей
	def filter_detals(self, request):
		company = Company.objects.filter(staff_users=request.user)
		detals_company = UserDetal.objects.filter(company=company[0])
		if request.POST['detal'] != 'Все детали':
			detals_company = detals_company.filter(title=request.POST['detal'])
			print('Фильтрация по детали')
		if request.POST['mark'] != 'Все марки':
			print('Фильтрация по марке')
			donor_mark = AutoDonor.objects.filter(mark=AutoMark.objects.get(title=request.POST['mark']))
			detals_company = detals_company.filter(donor_info__in=donor_mark)
		if request.POST['model'] != 'Все модели':
			detals_company = detals_company.filter(donor_info__model=request.POST['model'])		
			print('Фильтрация по модели')
		if request.POST['generation'] != 'Все поколения':
			detals_company = detals_company.filter(donor_info__generation=request.POST['generation'])		
			print('Фильтрация по поколению')
		if request.POST['number'] != '':
			print('Фильтрация по номеру')
			pass
		if request.POST['stock'] != 'noselect':	
			detals_company = detals_company.filter(stockroom=Stock.objects.get(pk=request.POST['stock']))	
			print('Фильтрация по складу')
		if request.POST['stock_param'] != 'noselect':
			print('Фильтрация по складской ячейче')
			pass	
		return Paginator(detals_company, 25)

	# Подгрузка страниц 
	def load_ajax_page(self, request):
		num_page = int(request.POST['active_page'])
		query_result = self.filter_detals(request)
		data = self.generation_dict_detals(request, query_result, num_page)
		return data

	# Подгрузка каталогов
	def load_cats(self, request):
		data = {'key':'283R8Q8ckCYq9cyQSgYiXDpYFguSf7ox', 'group': 'passenger'}
		if request.POST['cat'] == 'getModels':
			data.update({'act': 'getModels', 'make': request.POST['mark']})
		if request.POST['cat'] == 'getCars':
			data.update({'act': 'getCars', 'make': request.POST['mark'], 'model': request.POST['model']})
		r = requests.post('https://partsapi.ru/api.php', data=data)
		return json.loads(r.content)

	# Добавление деталей на выгрузку
	def add_to_upload(self, request):
		for elem in request.POST.getlist('add_ids[]'):
			detal_obj = UserDetal.objects.get(id=elem)
			detal_obj.uploaded = True
			detal_obj.save()
			UploadDetal.objects.create(detal=detal_obj)
		return 'good'

	# Удаление детали с выгрузки
	def delete_in_upload(self, request):
		user_detal_obj = UserDetal.objects.get(id=request.POST['delete_id'])
		user_detal_obj.uploaded = False
		user_detal_obj.save()
		upload_detal_obj = UploadDetal.objects.get(detal=user_detal_obj)
		upload_detal_obj.delete()
		return 'good'

	# Очистка списка выгрузки
	def clear_upload_list(self, request):
		for elem in request.POST.getlist('all_delete_id[]'):
			user_detal_obj = UserDetal.objects.get(id=elem)
			user_detal_obj.uploaded = False
			user_detal_obj.save()
			upload_detal_obj = UploadDetal.objects.get(detal=user_detal_obj)
			upload_detal_obj.delete()
		return 'good'

	# Рендеринг шаблона
	def render_template(self, request, result, num_page=1):
		query_result = result.page(num_page).object_list
		all_detals = query_result.count()
		context = {'all_detals' : [{'detal': query_result[i], 'count': i+1+((int(num_page)-1)*25) } for i in range(all_detals)],
				   'upload_detals': UploadDetal.objects.all(),
				   'page': result,
				   'active_page': int(num_page),
				   'forms': {'donor': DonorForm, 
				   			 'add_stock': StockForm,
				   			 'auto_select': MarkModelGen,
				   			 'filters': {'small': SmallFilter, 'full': ''}},
				   'selected': '',
				   'stockroom_count': Stock.objects.filter(company=(Company.objects.filter(staff_users=request.user)).count()),
				   'group_user': request.user.groups.all()[0].name}
		return render(request, 'detals_list/index.html', context=context)
