import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import axios from 'axios';
import Menu from './components/Menu';
import Footer from './components/Footer';
import UserList from './components/User';
import ProjectList from './components/Project';
import NoteList from './components/Note';
import ProjectNotesList from './components/ProjectNote';
import LoginForm from './components/Auth';
import Cookies from 'universal-cookie/es6';

const baseUrl = 'http://localhost:8000';
const apiUrl = `${baseUrl}/api`;
const getUrl = (path) => `${baseUrl}/${path}/`;
const getApiUrl = (path) => `${apiUrl}/${path}/`;

const notFound404 = ({location}) => {
    return (
        <div className='d-flex align-items-center justify-content-center' style={{'height': '30em'}}>
            <h1 className='d-inline-block'>Page '{location.pathname}' not found</h1>
        </div>

    )
}

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            'users': [],
            'projects': [],
            'notes': [],
            'token': '',
            'username': ''
        };
    }

    logout() {
        this.setTokenAndUser('', '');
        this.setState({
            'users': [],
            'projects': [],
            'notes': []
        });
    }

    isAuthenticated() {
        return !!this.state?.token;
    }

    getHeaders() {
        let headers = {
            'Content-Type': 'application/json'
        }
        if (this.isAuthenticated()) {
            headers['Authorization'] = `Token ${this.state.token}`;
        }
        return headers;
    }

    loadData() {
        if (!this.isAuthenticated()) return;
        const headers = this.getHeaders();
        axios.all(
            [
                axios.get(getApiUrl('users'), {headers}),
                axios.get(getApiUrl('projects'), {headers}),
                axios.get(getApiUrl('notes'), {headers})
            ]
        )
            .then(axios.spread((users, projects, notes) => {
                this.setState(
                    {
                        'users': users.data.results,
                        'projects': projects.data.results,
                        'notes': notes.data.results,
                    }
                )
            }))
            .catch(error => console.error(error));
    }

    setTokenAndUser(token, username) {
        const cookies = new Cookies();
        cookies.set('token', token);
        cookies.set('username', username);
        this.setState({token, username}, () => this.loadData());
    }

    getTokenAndUser(username, password) {
        axios.post(getUrl('api-token-auth'), {username, password})
            .then(response => {
                this.setTokenAndUser(response.data['token'], username);
            }).catch(err => alert('Invalid login or password'))
    }

    getTokenAndUserFromStorage() {
        const cookies = new Cookies();
        const token = cookies.get('token');
        const username = cookies.get('username');
        this.setState({token, username}, () => this.loadData());
    }

    componentDidMount() {
        this.getTokenAndUserFromStorage();
    }

    render() {
        return (
            <Router>
                <Menu isAuthenticated={this.isAuthenticated()}
                      logout={() => this.logout()}
                      username={this.state.username}/>
                <Switch>
                    <Route exact path='/users' component={() => {
                        if (!this.isAuthenticated()) return <Redirect to='/login'/>;
                        return <UserList users={this.state.users}/>;
                    }}/>
                    <Route exact path='/projects' component={() => {
                        if (!this.isAuthenticated()) return <Redirect to='/login'/>;
                        return <ProjectList users={this.state.users}
                                            projects={this.state.projects}/>;
                    }}/>
                    <Route path='/projects/:projectId' component={() => {
                        if (!this.isAuthenticated()) return <Redirect to='/login'/>;
                        return <ProjectNotesList users={this.state.users}
                                                 projects={this.state.projects}
                                                 notes={this.state.notes}/>
                    }}/>
                    <Route exact path='/notes' component={() => {
                        if (!this.isAuthenticated()) return <Redirect to='/login'/>;
                        return <NoteList users={this.state.users}
                                         notes={this.state.notes}
                                         projects={this.state.projects}/>;
                    }}/>
                    <Route exact path='/login' component={() => {
                        if (this.isAuthenticated()) return <Redirect to='/'/>;
                        return <LoginForm getToken={(username, password) => this.getTokenAndUser(username, password)}/>
                    }}/>
                    <Redirect from='/' to='/projects'/>
                    <Route component={notFound404}/>
                </Switch>
                <Footer/>
            </Router>
        );
    }

}

export default App;
