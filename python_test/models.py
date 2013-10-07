from hashlib import md5
from datetime import datetime

from django.conf import settings
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.core.urlresolvers import reverse
from django.core.mail import send_mail


class CustomUser(AbstractUser):
    # Custom fields
    pass


def create_hash():
    return  md5(str(datetime.now()) + settings.SECRET_KEY).hexdigest()

class Invite(models.Model):
    hash_key = models.CharField(max_length=255, default=create_hash(), primary_key=True)
    email = models.EmailField()
    # referral_user = models.ForeignKey(, help_text='User sent the invitation')


@receiver(post_save, sender=Invite)
def sent_mail(sender, instance, **kwargs):
    invite_url = reverse('create_user_by_invite', kwargs={'hash_key': instance.hash_key})
    msg = "Welcome! https://{}".format(invite_url)

    send_mail('Welcome', msg, settings.FROM_EMAIL, [instance.email])
