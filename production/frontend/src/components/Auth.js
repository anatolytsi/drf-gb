import React from 'react';
import {Redirect} from "react-router-dom";


class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }

    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault();
        this.props.getToken(this.state.username, this.state.password);
    }

    render() {
        return (
            <div className='container-fluid h-100'>
                <div className='h-100 justify-content-center align-items-center d-flex'>
                    <form className='col-2' onSubmit={(event => this.submitHandler(event))}>
                        <div className='form-group'>
                            <div className='form-group'>
                                <label htmlFor='Login'>Login</label>
                                <input type='text' placeholder='Login' id='Login' name='username'
                                       className='form-control'
                                       onChange={(event) => this.changeHandler(event)}/>
                            </div>
                            <div className='form-group pt-2 pb-2'>
                                <label htmlFor='Password'>Password</label>
                                <input type='password' placeholder='Password' id='Password' name='password'
                                       className='form-control'
                                       onChange={(event) => this.changeHandler(event)}/>
                            </div>
                            <button type='submit' className='btn btn-primary'>Login</button>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default LoginForm;
