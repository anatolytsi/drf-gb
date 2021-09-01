from django_filters import rest_framework as filters

from notes.models import Project, Note


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name']


class NoteFilter(filters.FilterSet):

    class Meta:
        model = Note
        fields = ['project']
