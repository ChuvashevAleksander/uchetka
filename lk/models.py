from django.conf import settings
from django.db import models
from django.contrib.auth.models import User

class AutoMark(models.Model):
	title = models.CharField(max_length=80)
	value = models.CharField(max_length=80)

	def __str__(self):
		return self.title

class AutoModel(models.Model):
	title = models.CharField(max_length=80)
	value = models.CharField(max_length=80)
	mark = models.ForeignKey('AutoMark', on_delete=models.CASCADE)

	def __str__(self):
		return self.title

class AutoGeneration(models.Model):
	title = models.CharField(max_length=80)
	value = models.CharField(max_length=80)
	year = models.CharField(max_length=80)
	model = models.ForeignKey('AutoModel', on_delete=models.CASCADE, blank=True, null=True)

	def __str__(self):
		return self.title

class AutoDetal(models.Model):
	title = models.CharField(max_length=80)
	value = models.CharField(max_length=80)

	def __str__(self):
		return self.title

class AutoKuzov(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoYearProduction(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoEngineType(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoEngineSize(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoTransmission(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoColor(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoHelm(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoPrivod(models.Model):
	title = models.CharField(max_length=50)
	value = models.CharField(max_length=50)

	def __str__(self):
		return self.title

class AutoDonor(models.Model):
	mark = models.ForeignKey('AutoMark', on_delete=models.PROTECT)
	model = models.CharField(max_length=80)
	generation = models.CharField(max_length=80)
	kuzov = models.ForeignKey('AutoKuzov', on_delete=models.PROTECT, blank=True, null=True)
	year = models.ForeignKey('AutoYearProduction', on_delete=models.PROTECT, blank=True, null=True)
	engine_type = models.ForeignKey('AutoEngineType', on_delete=models.PROTECT, blank=True, null=True)
	engine_size = models.ForeignKey('AutoEngineSize', on_delete=models.PROTECT, blank=True, null=True)
	transmission = models.ForeignKey('AutoTransmission', on_delete=models.PROTECT, blank=True, null=True)
	color = models.ForeignKey('AutoColor', on_delete=models.PROTECT, blank=True, null=True)
	helm = models.ForeignKey('AutoHelm', on_delete=models.PROTECT, blank=True, null=True)
	privod = models.ForeignKey('AutoPrivod', on_delete=models.PROTECT, blank=True, null=True)
	probeg = models.IntegerField(blank=True, null=True)
	vin_number = models.CharField(max_length=50, blank=True, null=True)

	def __str__(self):
		return self.mark.title + ' ' + self.model + ' ' + self.generation

class Photo(models.Model):
	company = models.ForeignKey('Company', on_delete=models.CASCADE)
	photo = models.ImageField(blank=True, null=True)
	have = models.CharField(max_length=10)

class Stock(models.Model):
	class Meta:
		permissions = (
			("view_company_stock", "Просмотр складов компании"),
			("add_company_stock", "Добавлние складов компании"),
			("edit_company_stock", "Изменение складов компании"),
			("remove_company_stock", "Удаление складов компании"),
			)

	title = models.CharField(max_length=50)
	country = models.CharField(max_length=50)
	region = models.CharField(max_length=100)
	city = models.CharField(max_length=50)
	street = models.CharField(max_length=100)
	house = models.IntegerField()

	def __str__(self):
		return self.title

class UserDetal(models.Model):
	company = models.ForeignKey('Company', on_delete=models.CASCADE)
	title = models.CharField(max_length=120)
	price = models.IntegerField()
	description = models.TextField(null=True, blank=True)
	stockroom = models.ForeignKey('Stock', on_delete=models.CASCADE)
	photo = models.ForeignKey('Photo', on_delete=models.CASCADE, default=1)
	donor_info = models.ForeignKey('AutoDonor', on_delete=models.CASCADE)
	uploaded = models.BooleanField(default=False)
	
	def __str__(self):
		return self.title


class Company(models.Model):
	title = models.CharField(max_length=80)
	country = models.CharField(max_length=50)
	region = models.CharField(max_length=100)
	city = models.CharField(max_length=50)
	staff_users = models.ManyToManyField(User, blank=True)
	stocks = models.ManyToManyField(Stock, blank=True)

	def __str__(self):
		return self.title

class UploadDetal(models.Model):
	detal = models.OneToOneField('UserDetal', on_delete=models.CASCADE, unique=True)

	def __str__(self):
		return self.detal.title
