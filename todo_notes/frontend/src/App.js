import './App.css';
import React from 'react';
import UserList from './components/User';
import axios from "axios";
import Menu from "./components/Menu";
import Footer from "./components/Footer";
import ProjectList from './components/Project';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

const apiUrl = 'http://localhost:8000/api/';
const getUrl = (name) => `${apiUrl}${name}`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': []
        };
    }

    componentDidMount() {
        axios.get(getUrl('users'))
            .then(response => {
                const users = response.data;
                this.setState(
                    {
                        users
                    }
                );
            })
            .catch(error => console.error(error));
        axios.get(getUrl('projects'))
            .then(response => {
                const projects = response.data;
                this.setState(
                    {
                        projects
                    }
                );
            })
            .catch(error => console.error(error));
    }

    render() {
        return (
            <Router>
                <Menu/>
                <Switch>
                    <Route
                        path='/users'
                        render={(props) => (
                            <UserList {...props} users={this.state.users}/>
                        )}
                    />
                    <Route
                        path='/projects'
                        render={(props) => (
                            <ProjectList {...props} projects={this.state.projects}/>
                        )}
                    />
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;
