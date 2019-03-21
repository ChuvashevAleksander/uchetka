from django.urls import path, include

from .views import *

urlpatterns = [
    path('donor/', AddInDonor.as_view(), name='add_in_donor_page_url'),
    path('fast/', AddFast.as_view(), name='add_fast_page_url'),
]