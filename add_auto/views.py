import json
import requests

from django.shortcuts import render, redirect
from django.http import HttpResponse
from django.views.generic import View

from lk.models import *
from lk import models as modellls


class AddInDonor(View):
	def get(self, request):
		return self.render_template(request)

	def post(self, request):
		print(request.POST)
		if request.POST['cat'] == 'getSections':
			data = self.load_sections(request)
			return self.render_template(request, data)

	def get_data(self, data):
		r = requests.post('https://partsapi.ru/api.php', data=data)
		return json.loads(r.content)

	def load_sections(self, request):
		data = {'act': 'getSections', 'modification_id': request.POST['generation'], 'level': 0, 'key':'283R8Q8ckCYq9cyQSgYiXDpYFguSf7ox', 'group': 'passenger'}
		sections = {'sections': self.get_data(data)}
		return sections

	def render_template(self, request, data):
		context = {'sections': data}
		for elem in data:
			print(data)
		return render(request, 'add_auto/index.html', context=context)


class AddFast(View):
	def get(self, request):
		return self.render_template(request)

	def render_template(self, request, data):
		context = {'sections': ''}
		return render(request, 'add_auto/index.html', context=context)



