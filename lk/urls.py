from django.urls import path, include

from .views import *

urlpatterns = [
    path('', rediredct_detal_list_page),
    path('load_cat/', load_cats),
    path('logout/', logout_lk, name='logout_url'),
    path('add_random_detals/', add_random_detal),
    path('add_random_donor/', add_random_donor),
    path('add/', include('add_auto.urls')),
    path('detals_list/', include('detals_list.urls')),
    path('stocks/', include(('stocks.urls', 'stocks'), namespace='stocks')),
    path('staff/', include(('staff.urls', 'staff'), namespace='staff')),
    path('stats/', include(('stats.urls', 'stats'), namespace='stats')),
]