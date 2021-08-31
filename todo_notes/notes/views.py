from rest_framework.viewsets import ModelViewSet

from notes.models import Project, Note
from notes.serializers import ProjectModelSerializer, NoteModelSerializer


class ProjectModelViewSet(ModelViewSet):
    """
    Provides actions to list, retrieve, create, update or destroy Project model/-s
    """
    queryset = Project.objects.all()
    serializer_class = ProjectModelSerializer


class NoteModelViewSet(ModelViewSet):
    """
    Provides actions to list, retrieve, create, update or destroy Note model/-s
    """
    queryset = Note.objects.all()
    serializer_class = NoteModelSerializer
