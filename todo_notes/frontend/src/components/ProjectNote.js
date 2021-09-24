import React, {useState} from 'react';
import {Link, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const ProjectNoteItem = ({author, note, updateNote}) => {
    return (
        <tr>
            <td>
                <Link to={`/users/${author?.id}`}
                      className='text-decoration-none'>{`${author?.first_name} ${author?.last_name}`}</Link>
            </td>
            <td>
                {note?.body}
            </td>
            <td>
                {note?.createdAt}
            </td>
            <td>
                {note?.updatedAt}
            </td>
            <td>
                <input type='checkbox' style={{'width': '20px', 'height': '20px'}} defaultChecked={note?.isActive}
                       onChange={() => updateNote(note?.id)}/>
            </td>
        </tr>
    )
};

export const ProjectEditPopUp = ({project, toggle, updateProject}) => {
    const props = {...project};
    const submitHandler = (event) => {
        event.preventDefault();
        updateProject(props);
        toggle();
    }
    const changeHandler = (event) => {
        if (event.target.name === 'users') {
            props[event.target.name] = event.target.value.split(';').map((id) => +id);
        } else {
            props[event.target.name] = event.target.value;
        }
    }
    return (
        <form className='col-2 text-center mx-auto w-10' onSubmit={(event => submitHandler(event))}>
            <div className='form-group'>
                <div className='form-group'>
                    <label htmlFor='Name'>Project name</label>
                    <input type='text' placeholder='Project name' id='Name' name='name'
                           className='form-control'
                           onChange={(event) => changeHandler(event)}
                           defaultValue={props.name}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='Url'>Project URL</label>
                    <input type='text' placeholder='Project URL' id='Url' name='url'
                           className='form-control'
                           onChange={(event) => changeHandler(event)}
                           defaultValue={props.repositoryUrl}
                    />
                </div>
                <div className='form-group'>
                    <label htmlFor='Users IDs (semicolon separated, e.g., (1;2;3))'>Users</label>
                    <input type='text' placeholder='User IDs (semicolon separated, e.g., (1;2;3))' id='Users' name='users'
                           className='form-control'
                           onChange={(event) => changeHandler(event)}
                           defaultValue={props.users.join(';')}
                    />
                </div>
                <button className='btn btn-success' type='submit'>Update!</button>
            </div>
        </form>
    );
}

const ProjectNotesList = ({users, projects, notes, deleteProject, updateProject, updateNote}) => {
    let {projectId} = useParams();
    let project = projects?.filter((project) => project.id === +projectId);
    let projectNotes = notes?.filter((note) => note.project === +projectId);
    let projectUsers = users?.filter((user) => project?.[0].users?.filter((prjUserId) => user.id === prjUserId));
    let projectUsersDispatched = [];
    for (let i = 0; i < project?.[0].users?.length; i++) {
        projectUsersDispatched.push({
            first_name: projectUsers?.[i].first_name,
            last_name: projectUsers?.[i].last_name,
            id: projectUsers?.[i].id
        })
    }
    const [popToggled, setPopToggled] = useState(false);
    const togglePopUp = () => popToggled ? setPopToggled(false) : setPopToggled(true);
    return (
        <div>
            <h1 className='text-center'> Project: <a className='text-decoration-none'
                                                     href={project?.[0].url}> {project?.[0].name} </a></h1>
            <h2 className='text-center'> Participants: {
                projectUsersDispatched.length > 0
                    ? projectUsersDispatched.map((user) =>
                        <Link to={`/users/${user.id}`} className='text-decoration-none' key={user.id}>
                            {`${user.first_name} ${user.last_name}, `}
                        </Link>
                    )
                    : 'no one'
            }</h2>
            <div className='text-center mx-auto w-25 d-flex justify-content-around'>
                <button className='btn btn-danger' onClick={() => deleteProject(project?.id)} type='button'>
                    Delete Project
                </button>
                <button className='btn btn-warning'
                        onClick={() => togglePopUp()}
                        type='button'>
                    Update Project
                </button>
            </div>
            <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '10%'}}>
                <thead>
                <tr>
                    <th scope='col' style={{'width': '10%'}}>Author</th>
                    <th scope='col' style={{'width': '65%'}}>Body</th>
                    <th scope='col' style={{'width': '10%'}}>Created</th>
                    <th scope='col' style={{'width': '10%'}}>Updated</th>
                    <th scope='col' style={{'width': '5%'}}>Active</th>
                </tr>
                </thead>
                <tbody>
                {projectNotes.map((note) => {
                    let author = users?.find((user) => user.id === note.author);
                    return <ProjectNoteItem key={note.id} author={author} note={note} updateNote={updateNote}/>;
                })}
                </tbody>
            </table>
            <div>
                {popToggled
                    ? <ProjectEditPopUp project={project?.[0]} updateProject={updateProject}
                                        toggle={() => setPopToggled(false)}/>
                    : null}
            </div>
        </div>
    )
};

export default ProjectNotesList;
