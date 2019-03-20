from django.urls import path, include

from .views import *

urlpatterns = [
    path('', AddDetalPage.as_view(), name='add_detal_page_url'),
]