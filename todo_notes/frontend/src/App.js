import './App.css';
import React from 'react';
import UserList from './components/User';
import axios from "axios";

const baseUrl = 'http://localhost:8000/api';
const usersPath = '/users';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': []
        };
    }

    componentDidMount() {
        axios.get(`${baseUrl}${usersPath}`)
            .then(response => {
                const users = response.data;
                this.setState(
                    {
                        users
                    }
                );
            })
            .catch(error => console.error(error));
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
