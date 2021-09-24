import graphene
from django.db.models import Q
from django.shortcuts import get_object_or_404
from graphene_django import DjangoObjectType

from notes.models import Project, Note
from users.models import User


class UserType(DjangoObjectType):
    class Meta:
        model = User
        fields = '__all__'


class UserMutation(graphene.Mutation):
    class Arguments:
        id = graphene.ID()
        first_name = graphene.String()
        last_name = graphene.String()
        email = graphene.String()  # No Email field type :(

    user = graphene.Field(UserType)

    @classmethod
    def mutate(cls, self, info, id, first_name='', last_name='', email=''):
        user = User.objects.get(pk=id)
        user.first_name = first_name if first_name else user.first_name
        user.last_name = last_name if last_name else user.last_name
        user.email = email if email else user.email
        user.save()
        return UserMutation(user=user)


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
    user_by_id = graphene.Field(UserType, id=graphene.Int(required=True))
    users_by_name = graphene.List(UserType, name=graphene.String())
    project_by_id = graphene.Field(ProjectType, id=graphene.Int(required=True))
    projects_by_name = graphene.List(ProjectType, name=graphene.String())
    note_by_id = graphene.Field(NoteType, id=graphene.Int(required=True))
    notes_by_body = graphene.List(NoteType, body=graphene.String())
    all_projects = graphene.List(ProjectType)
    all_notes = graphene.List(NoteType)

    def resolve_all_users(self, info):
        return User.objects.all()

    def resolve_user_by_id(self, info, id):
        return get_object_or_404(User, pk=id)

    def resolve_users_by_name(self, info, name=''):
        return User.objects.filter(Q(first_name__contains=name) | Q(last_name__contains=name))

    def resolve_all_projects(self, info):
        return Project.objects.all()

    def resolve_project_by_id(self, info, id):
        return get_object_or_404(Project, pk=id)

    def resolve_projects_by_name(self, info, name=''):
        return Project.objects.filter(name__contains=name)

    def resolve_all_notes(self, info):
        return Note.objects.all()

    def resolve_note_by_id(self, info, id):
        return get_object_or_404(Note, pk=id)

    def resolve_notes_by_body(self, info, body=''):
        return Note.objects.filter(body__contains=body)


class Mutation(graphene.ObjectType):
    update_user = UserMutation.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)
