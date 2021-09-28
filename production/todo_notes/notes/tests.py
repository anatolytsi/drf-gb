from django.contrib.auth import get_user_model
from django.test import TestCase
from mixer.backend.django import mixer
from rest_framework import status
from rest_framework.test import force_authenticate, APIRequestFactory, APITestCase

from notes.models import Note
from notes.views import ProjectModelViewSet
from users.models import User


class TestProjectViewSet(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='user',
                                             email='user@gb.local',
                                             password='geekbrains')
        self.admin = User.objects.create_superuser(username='django',
                                                   email='admin@gb.local',
                                                   password='geekbrains')
        self.data = {'name': 'test project',
                     'repository_url': 'http://test.com/',
                     'users': [self.user.id]}

    def test_create_project_user(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/projects/',
            self.data,
            format='json'
        )
        force_authenticate(request, user=self.user)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_403_FORBIDDEN)

    def test_create_project_admin(self):
        factory = APIRequestFactory()
        request = factory.post(
            '/api/projects/',
            self.data,
            format='json'
        )
        force_authenticate(request, user=self.admin)
        view = ProjectModelViewSet.as_view({'post': 'create'})
        response = view(request)
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)


class TestNoteViewSet(APITestCase):
    def setUp(self):
        self.user = get_user_model().objects.create_user(username='user',
                                                         email='user@gb.local',
                                                         password='geekbrains')
        self.admin = get_user_model().objects.create_superuser(username='django',
                                                               email='admin@gb.local',
                                                               password='geekbrains')

    def test_get_notes(self):
        self.client.login(username='user', password='geekbrains')
        response = self.client.get('/api/notes/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_edit_note(self):
        note = mixer.blend(Note)
        self.client.force_login(user=self.admin)
        data = {
            'body': 'Changed text!',
            'project': note.project.id,
            'author': note.author.id
        }
        response = self.client.put(f'/api/notes/{note.id}/', data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['body'], data['body'])
