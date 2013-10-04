from django.conf.urls.defaults import patterns, url

from views import create_user_by_invite

urlpatterns = patterns('',
    url(r'^invite/(?P<hash_key>.+)/$', 'create_user_by_invite', name='create_user_by_invite'),
    )