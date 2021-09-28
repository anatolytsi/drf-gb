import random

from django.core.management.base import BaseCommand

from notes.models import Project
from users.models import User


class Command(BaseCommand):
    """
    To-Do-Notes projects creation command class
    """
    help = 'Create ToDo-Notes projects'

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)

    def handle(self, *args, **options):
        Project.objects.all().delete()
        count = options['count']
        users = User.objects.all()
        for i in range(count):
            project = Project.objects.create(name=f'project{i}',
                                             repository_url=f'{generate_random_url()}/project{i}')
            for user in get_random_users(users):
                project.users.add(user)
            print(f'Project {project} was created')
        print('Done')


def generate_random_url():
    ip0 = str(random.randint(0, 255))
    ip1 = str(random.randint(0, 255))
    ip2 = str(random.randint(0, 255))
    ip3 = str(random.randint(0, 255))
    return f'http://{ip0}.{ip1}.{ip2}.{ip3}'


def get_random_users(users, num_of_users=None):
    total_num_of_users = len(users)
    user_list = []
    if not num_of_users:
        num_of_users = random.randint(1, 5)
    while len(user_list) != num_of_users or (num_of_users > total_num_of_users and len(user_list) != total_num_of_users):
        user = random.choice(users)
        if user not in user_list:
            user_list.append(user)
    return user_list

