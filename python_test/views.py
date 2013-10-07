

from django.shortcuts import get_object_or_404, redirect
from django.contrib.auth import get_user_model, authenticate, login
from django.db import IntegrityError

from models import CustomUser, Invite

def create_user_by_invite(request, hash_key):
    invite_user = get_object_or_404(Invite, hash_key = hash_key)
    user_model = get_user_model()
    random_pswd = user_model.objects.make_random_password()
    try:
        user = user_model(username = invite_user.email)
        user.set_password(random_pswd)
        user.save()
    except IntegrityError:
        # If username is not unique
        return redirect('create_custom_user', email=invite_user.email)

    user = authenticate(username=user.username, password=random_pswd)
    login(request, user)

    return redirect('django.contrib.auth.views.password_change')