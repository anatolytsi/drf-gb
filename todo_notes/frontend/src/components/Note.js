import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";


const NoteItem = ({project, author, note}) => {
    let projectLink = `/projects/${project?.url.split('projects/')?.[1]}`;
    let authorLink = `/users/${author?.url.split('users/')?.[1]}`;
    return (
        <tr>
            <td>
                <Link to={projectLink} className='text-decoration-none'>{project?.name}</Link>
            </td>
            <td>
                <Link to={authorLink} className='text-decoration-none'>{`${author?.first_name} ${author?.last_name}`}</Link>
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

const NoteList = ({projects, users, notes}) => {
    return (
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '25%'}}>Project</th>
                <th scope='col' style={{'width': '25%'}}>Author</th>
                <th scope='col' style={{'width': '25%'}}>Body</th>
                <th scope='col' style={{'width': '10%'}}>Created</th>
                <th scope='col' style={{'width': '10%'}}>Updated</th>
                <th scope='col' style={{'width': '5%'}}>Active</th>
            </tr>
            </thead>
            <tbody>
            {notes.map((note) => {
                let project = projects?.find((project) => project.url === note.project);
                let author = users?.find((user) => user.url === note.author);
                return <NoteItem key={note.url} project={project} author={author} note={note}/>
            })}
            </tbody>
        </table>
    )
};

export default NoteList;
