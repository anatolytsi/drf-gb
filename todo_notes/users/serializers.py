from rest_framework.serializers import ModelSerializer

from users.models import User


class UserModelSerializerBase(ModelSerializer):
    """
    A serializer (i.e. convert querysets and model instances to Python datatypes or back) that corresponds to the User
    model fields
    HyperlinkedModelSerializer - hyperlinks are used for representation instead of primary keys (unlike ModelSerializer)
    """

    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email']


class UserModelSerializerExtended(ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'is_superuser', 'is_staff']
