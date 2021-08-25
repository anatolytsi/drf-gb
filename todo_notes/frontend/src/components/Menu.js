import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const Menu = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <span className="ms-2 navbar-brand mb-0 h1">Menu</span>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <div className="navbar-nav">
                    <a className="nav-item nav-link active" href="#">List of all users</a>
                    <a className="nav-item nav-link disabled" href="#">User</a>
                    <a className="nav-item nav-link disabled" href="#">Login</a>
                    <a className="nav-item nav-link disabled" href="#">etc.</a>
                </div>
            </div>
        </nav>
    )
}

export default Menu
