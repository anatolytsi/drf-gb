from django.core.management.base import BaseCommand

from users.management.commands.create_superuser import create_superuser
from users.models import User


class Command(BaseCommand):
    """
    Superuser and Multiple user creation command class
    """
    help = 'Create superuser and users to test'

    def add_arguments(self, parser):
        parser.add_argument('count', nargs='?', type=int, default=5)

    def handle(self, *args, **options):
        User.objects.all().delete()
        su = create_superuser()
        print(f'Superuser {su} was created')
        count = options['count']
        for i in range(count):
            user = User.objects.create_user(username=f'user{i}',
                                            first_name=f'fname{i}',
                                            last_name=f'lname{i}',
                                            email=f'{i}@mail.com')
            print(f'User {user} was created')
        print('Done')
