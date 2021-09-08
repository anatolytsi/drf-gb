import React from 'react';
import {Link, useParams} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';


const ProjectNoteItem = ({author, note}) => {
    let authorLink = `/users/${author?.url.split('users/')?.[1]}`;
    return (
        <tr>
            <td>
                <Link to={authorLink}
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
                <input type='checkbox' defaultChecked={note?.isActive} disabled/>
            </td>
        </tr>
    )
};

const ProjectNotesList = ({users, projects, notes}) => {
    let {projectId} = useParams();
    let projectUrl = `projects/${projectId}`;
    let project = projects.filter((project) => project.url.includes(projectUrl))?.[0];
    let projectNotes = notes.filter((note) => note.project.includes(projectUrl));
    return (
        <div>
            <h1 className='text-center'>{project?.name}</h1>
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
                    let author = users?.filter((user) => user.url === note.author)?.[0];
                    return <ProjectNoteItem key={note.url} author={author} note={note}/>;
                })}
                </tbody>
            </table>
        </div>
    )
};

export default ProjectNotesList;
