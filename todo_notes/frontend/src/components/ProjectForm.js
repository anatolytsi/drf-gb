import React from "react";

class ProjectForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            repositoryUrl: '',
            users: props?.users?.[0]?.id,
        }
    }

    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault()
        this.props.createProject(this.state)
    }

    render() {
        return (
            <div>
                <h1 className='text-center'> Create new project</h1>
                <form className='col-2 text-center mx-auto w-10' onSubmit={(event => this.submitHandler(event))}>
                    <div className='form-group'>
                        <div className='form-group'>
                            <label htmlFor='Name'>Project name</label>
                            <input type='text' placeholder='Project name' id='Name' name='name'
                                   className='form-control'
                                   onChange={(event) => this.changeHandler(event)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Url'>Project URL</label>
                            <input type='text' placeholder='Project URL' id='Url' name='repositoryUrl'
                                   className='form-control'
                                   onChange={(event) => this.changeHandler(event)}
                            />
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Users'>Users</label>
                            <select id='Users' name="users" className='form-control'
                                    onChange={(event) => this.changeHandler(event)}>
                                {this.props.users.map((item) => <option value={item.id}>{item.username}</option>)}
                            </select>
                        </div>
                        <button className='btn btn-success' type='submit'>Create!</button>
                    </div>
                </form>
            </div>
        )
    }
}

export default ProjectForm
