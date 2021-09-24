import requests

response = requests.post('http://localhost:8000/api-token-auth/',
                         data={
                             'username': 'django_user1',
                             'password': 'geekbrains'
                         })
token = f'Token {response.json()["token"]}'
print(response.json())
response = requests.get('http://localhost:8000/api/users/40/',
                        headers={'Accept': 'application/json', 'Authorization': token})
# {'id': 40, 'username': 'django', 'first_name': 'Admin', 'last_name': 'Django', 'email': 'drf@gb.ru'}
print(response.json())
response = requests.get('http://localhost:8000/api/users/40/',
                        headers={'Accept': 'application/json; version=0.2', 'Authorization': token})
# {'id': 40, 'username': 'django', 'first_name': 'Admin', 'last_name': 'Django', 'email': 'drf@gb.ru',
# 'is_superuser': True, 'is_staff': True}
print(response.json())
