from django.db import models

from users.models import User


class Project(models.Model):
    """
    A To-Do-Notes Project model, which a name, a repository url and participants
    """
    name = models.CharField(max_length=128, unique=True)
    repository_url = models.URLField(blank=True)
    users = models.ManyToManyField(User)

    def __str__(self):
        return f'{self.name}'


class Note(models.Model):
    """
    A To-Do-Note model, which belongs to a project, has an author, body, creation time, update time, and active flag
    """
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    body = models.TextField()
    created_at = models.DateField(auto_now_add=True)
    updated_at = models.DateField(auto_now=True)
    is_active = models.BooleanField(default=True)
