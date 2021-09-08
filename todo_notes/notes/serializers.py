from rest_framework.serializers import ModelSerializer

from notes.models import Project, Note


class ProjectModelSerializer(ModelSerializer):
    """
    A serializer (i.e. convert querysets and model instances to Python datatypes or back) that corresponds to the
    Project model field
    HyperlinkedModelSerializer - hyperlinks are used for representation instead of primary keys (unlike ModelSerializer)
    """

    class Meta:
        model = Project
        fields = '__all__'  # The model is custom built so we need all the fields we put there


class NoteModelSerializer(ModelSerializer):
    """
    A serializer (i.e. convert querysets and model instances to Python datatypes or back) that corresponds to the Note
    model field
    HyperlinkedModelSerializer - hyperlinks are used for representation instead of primary keys (unlike ModelSerializer)
    """

    class Meta:
        model = Note
        fields = '__all__'  # The model is custom built so we need all the fields we put there
