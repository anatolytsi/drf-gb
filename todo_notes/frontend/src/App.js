import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import axios from "axios";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Footer from "./components/Footer";
import UserList from './components/User';
import ProjectList from './components/Project';
import NoteList from './components/Note';

const apiUrl = 'http://localhost:8000/api/';
const getUrl = (name) => `${apiUrl}${name}`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'notes': []
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
        axios.get(getUrl('notes'))
            .then(response => {
                const notes = response.data;
                this.setState(
                    {
                        notes
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
                    <Route path='/' exact component={Home}/>
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
                    <Route
                        path='/notes'
                        render={(props) => (
                            <NoteList {...props} notes={this.state.notes}/>
                        )}
                    />
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;
