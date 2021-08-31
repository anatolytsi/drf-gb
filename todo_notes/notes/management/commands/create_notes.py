import random

from django.core.management.base import BaseCommand

from notes.models import Note, Project


class Command(BaseCommand):
    """
    To-Do-Notes projects creation command class
    """
    help = 'Create ToDo-Notes'

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)

    def handle(self, *args, **options):
        Note.objects.all().delete()
        count = options['count']
        projects = Project.objects.all()
        for i in range(count):
            project = random.choice(projects)
            note = Note.objects.create(project=project,
                                       author=random.choice(project.users.all()),
                                       body=f'note{i}')
            print(f'ToDo note {note} was created')
        print('Done')
