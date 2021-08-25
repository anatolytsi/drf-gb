import environ

from users.models import User

env = environ.Env(
    # set casting, default value
    DEBUG=(bool, False),
    DEFAULT_SU_LOGIN=(str, 'admin'),
    DEFAULT_SU_PASS=(str, 'admin'),
    DEFAULT_SU_EMAIL=(str, 'admin@admin.admin')
)

# Reading .env file
base = environ.Path(__file__) - 4  # Environment file is situated four folders back
environ.Env.read_env(env_file=base('.env'))


def create_superuser(
        username=env('DEFAULT_SU_LOGIN'),
        password=env('DEFAULT_SU_PASS'),
        email=env('DEFAULT_SU_EMAIL'),
        first_name="Admin",
        last_name="Django"):
    """
    Creates a superuser for Django
    :param username: superuser username
    :param password: superuser password
    :param email: superuser emails
    :param first_name: superuser first name
    :param last_name: superuser last name
    :return: user model instance
    """

    user = User.objects.create_superuser(username=username,
                                         email=email,
                                         first_name=first_name,
                                         last_name=last_name,
                                         password=password)
    return user
