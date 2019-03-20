from django import forms
from lk.models import *

class SmallFilter(forms.Form):
	price_min = forms.IntegerField()
	price_min.widget.attrs.update({'class': 'form-control', 'placeholder': 'Цена от ...', 'step': '500'})

	price_max = forms.IntegerField()
	price_max.widget.attrs.update({'class': 'form-control', 'placeholder': 'Цена до ...', 'step': '500'})
	
	all_detals = [('noselect', 'Все детали')]
	for elem in AutoDetal.objects.all():
		all_detals.append((elem.value, elem.title))
	detal = forms.ChoiceField(widget=forms.Select, choices=all_detals)
	detal.widget.attrs.update({'class': 'custom-select'})
	
	all_marks = [('noselect', 'Все марки')]
	for elem in AutoMark.objects.all():
		all_marks.append((elem.value, elem.title))
	mark = forms.ChoiceField(widget=forms.Select, choices=all_marks)
	mark.widget.attrs.update({'class': 'custom-select', 'id': 'all_marks'})

	model = forms.ChoiceField(widget=forms.Select, choices=[('noselect', 'Все модели')])
	model.widget.attrs.update({'class': 'custom-select', 'id': 'all_models', 'disabled': ''})

	generation = forms.ChoiceField(widget=forms.Select, choices=[('noselect', 'Все поколения')])
	generation.widget.attrs.update({'class': 'custom-select', 'id': 'all_generations', 'disabled': ''})

	number = forms.CharField(max_length=50)
	number.widget.attrs.update({'class': 'form-control', 'placeholder': 'Оригинальный номер'})

	all_stocks = [('noselect', 'Все авторазборы')]
	for elem in Stock.objects.all():
		all_stocks.append((elem.pk, elem.title))
	stock = forms.ChoiceField(widget=forms.Select, choices=all_stocks)
	stock.widget.attrs.update({'class': 'custom-select'})

	all_stock_params = []
	stock_param = forms.ChoiceField(widget=forms.Select, choices=[('noselect', 'Все ячейки')])
	stock_param.widget.attrs.update({'class': 'custom-select'})

