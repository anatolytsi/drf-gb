from django.test import TestCase
from rest_framework import status
from rest_framework.test import APIClient

from users.models import User


class TestUserViewSet(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='user',
                                             email='user@gb.local',
                                             password='geekbrains')

    def test_get_detail_no_auth(self):
        client = APIClient()
        response = client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

    def test_get_detail_auth(self):
        client = APIClient()
        client.force_authenticate(user=self.user)
        response = client.get(f'/api/users/{self.user.id}/')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
