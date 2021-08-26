import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to='/' className="ms-2 navbar-brand mb-0 h1">
                Menu
            </Link>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <Link to='/users' className="nav-item nav-link active">
                        List of all users
                    </Link>
                    <Link to='/projects' className="nav-item nav-link active">
                        List of all projects
                    </Link>
                    <Link to='/notes' className="nav-item nav-link active">
                        List of all notes
                    </Link>
                </div>
            </div>
        </nav>
    )
}

export default Menu
