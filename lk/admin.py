from django.contrib import admin

from .models import * 
# Register your models here.
myModels = [AutoMark, AutoModel, AutoGeneration, AutoDetal, AutoDonor, UserDetal, 
			Stock, Photo, Company, UploadDetal]
admin.site.register(myModels)