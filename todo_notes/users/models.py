from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    """
    A standard User model from an AbstractUser to inherit the default fields from the latter
    """
    email = models.EmailField(unique=True)

    class Meta:
        ordering = ['pk']

    def __str__(self):
        return f'{self.username} | {self.email} | {self.first_name} {self.last_name}'
