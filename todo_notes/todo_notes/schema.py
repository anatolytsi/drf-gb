import graphene
from graphene_django import DjangoObjectType

from notes.models import Project, Note
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class ProjectType(DjangoObjectType):
    class Meta:
        model = Project
        fields = '__all__'


class NoteType(DjangoObjectType):
    class Meta:
        model = Note
        fields = '__all__'


class Query(graphene.ObjectType):
    all_users = graphene.List(UserType)
    all_projects = graphene.List(ProjectType)
    all_notes = graphene.List(NoteType)

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_all_notes(self, info):
        return Note.objects.all()


schema = graphene.Schema(query=Query)
