from rest_framework.serializers import HyperlinkedModelSerializer

from users.models import User


class UserModelSerializer(HyperlinkedModelSerializer):
    """
    A serializer (i.e. convert querysets and model instances to Python datatypes or back) that corresponds to the User
    model fields
    HyperlinkedModelSerializer - hyperlinks are used for representation instead of primary keys (unlike ModelSerializer)
    """

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email']
