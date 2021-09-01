from django_filters import rest_framework as filters, DateFromToRangeFilter

from notes.models import Project, Note


class ProjectFilter(filters.FilterSet):
    name = filters.CharFilter(lookup_expr='contains')
    users = filters.CharFilter(field_name='users__username', lookup_expr='contains')

    class Meta:
        model = Project
        fields = ['name', 'users']


class NoteFilter(filters.FilterSet):
    project__name = filters.CharFilter(lookup_expr='contains')
    author__username = filters.CharFilter(lookup_expr='contains')
    created_at = DateFromToRangeFilter()

    class Meta:
        model = Note
        fields = ['project', 'project__name', 'author__username', 'created_at']
