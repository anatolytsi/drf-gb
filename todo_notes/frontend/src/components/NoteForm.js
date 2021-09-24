import React from "react";

class NoteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            project: props?.projects?.[0]?.id,
            body: ''
        }
    }

    changeHandler(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    submitHandler(event) {
        event.preventDefault()
        this.props.createNote(this.state)
    }

    render() {
        return (
            <div>
                <h1 className='text-center'> Create new note</h1>
                <form className='col-2 text-center mx-auto w-10' onSubmit={(event => this.submitHandler(event))}>
                    <div className='form-group'>
                        <div className='form-group'>
                            <label htmlFor='Project'>Project</label>
                            <select name="project" className='form-control'
                                    onChange={(event) => this.changeHandler(event)}>
                                {this.props.projects.map((item) => <option value={item.id}>{item.name}</option>)}
                            </select>
                        </div>
                        <div className='form-group'>
                            <label htmlFor='Body'>Note body</label>
                            <input type='text' placeholder='Note body' id='Body' name='body'
                                   className='form-control'
                                   onChange={(event) => this.changeHandler(event)}
                            />
                        </div>
                        <button className='btn btn-success' type='submit'>Create!</button>
                    </div>
                </form>
            </div>
        )
    }

}

export default NoteForm
