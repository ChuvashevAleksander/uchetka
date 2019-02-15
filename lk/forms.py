from django import forms
from lk.models import *

class Photo(forms.Form):
	photo = forms.ImageField()


class DonorForm(forms.Form):
	vin = forms.CharField(max_length=50)
	vin.widget.attrs.update({'class': 'form-control', 'id': 'donorVin'})

	probeg = forms.CharField(max_length=50)
	probeg.widget.attrs.update({'class': 'form-control', 'id': 'donorProbeg'})

	# all_marks = [(elem.value, elem.title) for elem in AutoMark.objects.all()]
	# mark = forms.ChoiceField(widget=forms.Select, choices=all_marks)
	# mark.widget.attrs.update({'class': 'custom-select', 'id': 'all_marks'})

	# all_models = [(elem.value, elem.title) for elem in AutoModel.objects.all()]
	# model = forms.ChoiceField(widget=forms.Select, choices=all_models)
	# model.widget.attrs.update({'class': 'custom-select', 'id': 'all_models'})

	# all_generations = [(elem.year, elem.year) for elem in AutoGeneration.objects.all()]
	# generation = forms.ChoiceField(widget=forms.Select, choices=all_generations)
	# generation.widget.attrs.update({'class': 'custom-select', 'id': 'all_generations'})

	# all_years = [(elem.value, elem.title) for elem in AutoYearProduction.objects.all()]
	# year = forms.ChoiceField(widget=forms.Select, choices=all_years)
	# year.widget.attrs.update({'class': 'custom-select', 'id': 'all_years'})

	# all_kuzovs = [(elem.value, elem.title) for elem in AutoKuzov.objects.all()]
	# kuzov = forms.ChoiceField(widget=forms.Select, choices=all_kuzovs)
	# kuzov.widget.attrs.update({'class': 'custom-select', 'id': 'all_kuzovs'})

	# all_engine_type = [(elem.value, elem.title) for elem in AutoEngineType.objects.all()]
	# engine_type = forms.ChoiceField(widget=forms.Select, choices=all_engine_type)
	# engine_type.widget.attrs.update({'class': 'custom-select', 'id': 'all_engine_type'})

	# all_engine_size = [(elem.value, elem.title) for elem in AutoEngineSize.objects.all()]
	# engine_size = forms.ChoiceField(widget=forms.Select, choices=all_engine_size)
	# engine_size.widget.attrs.update({'class': 'custom-select', 'id': 'all_engine_size'})

	# all_kpp = [(elem.value, elem.title) for elem in AutoTransmission.objects.all()]
	# kpp = forms.ChoiceField(widget=forms.Select, choices=all_kpp)
	# kpp.widget.attrs.update({'class': 'custom-select', 'id': 'all_kpp'})

	# all_color = [(elem.value, elem.title) for elem in AutoColor.objects.all()]
	# color = forms.ChoiceField(widget=forms.Select, choices=all_color)
	# color.widget.attrs.update({'class': 'custom-select', 'id': 'all_color'})

	# all_helm = [(elem.value, elem.title) for elem in AutoHelm.objects.all()]
	# helm = forms.ChoiceField(widget=forms.Select, choices=all_helm)
	# helm.widget.attrs.update({'class': 'custom-select', 'id': 'all_helm'})

	# all_privod = [(elem.value, elem.title) for elem in AutoPrivod.objects.all()]
	# privod = forms.ChoiceField(widget=forms.Select, choices=all_privod)
	# privod.widget.attrs.update({'class': 'custom-select', 'id': 'all_privod'})