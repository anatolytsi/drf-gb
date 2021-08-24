from rest_framework.viewsets import ModelViewSet

from users.models import User
from users.serializers import UserModelSerializer


class UserModelViewSet(ModelViewSet):
    """
    Provides actions to list, retrieve, create, update or destroy User model/-s
    """
    queryset = User.objects.all()
    serializer_class = UserModelSerializer
