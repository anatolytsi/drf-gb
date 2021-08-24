import './App.css';
import React from 'react';
import UserList from './components/User'


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        const users = [
            {
                'username': 'ivan_ivanov',
                'email': 'ivan.ivanov@mail.ru',
                'first_name': 'Ivan',
                'last_name': 'Ivanov'
            },
            {
                'username': 'vasya_pupkin',
                'email': 'vasya.pupkin@mail.ru',
                'first_name': 'Vasya',
                'last_name': 'Pupkin'
            }
        ];
        this.setState(
            {
                users
            }
        );
    }

    render() {
        return (
            <div>
                <UserList users={this.state.users}/>
            </div>
        );
    }
}

export default App;
