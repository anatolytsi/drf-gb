import './App.css';
import React from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom';
import axios from "axios";
import Menu from "./components/Menu";
import Home from "./components/Home";
import Footer from "./components/Footer";
import UserList from './components/User';
import ProjectList from './components/Project';
import NoteList from './components/Note';

const apiUrl = 'http://localhost:8000/api/';
const getUrl = (name) => `${apiUrl}${name}`;

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
            'notes': []
        };
    }

    componentDidMount() {
        axios.get(getUrl('users'))
            .then(response => {
                const users = response.data.results;
                this.setState(
                    {
                        users
                    }
                );
            })
            .catch(error => console.error(error));
        axios.get(getUrl('projects'))
            .then(response => {
                const projects = response.data.results;
                this.setState(
                    {
                        projects
                    }
                );
            })
            .catch(error => console.error(error));
        axios.get(getUrl('notes'))
            .then(response => {
                const notes = response.data.results;
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
                    <Route exact path='/users' component={() => <UserList users={this.state.users}/>} />
                    <Route exact path='/projects' component={() => <ProjectList projects={this.state.projects}/>} />
                    <Route exact path='/notes' component={() => <NoteList notes={this.state.notes}/>} />
                    <Redirect from='/' to='/projects' />
                    <Route component={notFound404} />
                </Switch>
                <Footer/>
            </Router>
        );
    }
}

export default App;
