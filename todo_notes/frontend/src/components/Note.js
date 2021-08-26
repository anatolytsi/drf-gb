import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const NoteItem = ({note}) => {
    return (
        <tr>
            <td>
                {note?.project}
            </td>
            <td>
                {note?.author}
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

const NoteList = ({notes}) => {
    return (
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '25%'}}>Project (todo name)</th>
                <th scope='col' style={{'width': '25%'}}>Author (todo name)</th>
                <th scope='col' style={{'width': '25%'}}>Body</th>
                <th scope='col' style={{'width': '10%'}}>Created</th>
                <th scope='col' style={{'width': '10%'}}>Updated</th>
                <th scope='col' style={{'width': '5%'}}>Active</th>
            </tr>
            </thead>
            <tbody>
            {notes.map((note) => <NoteItem key={/* name key is unique */note.name} note={note}/>)}
            </tbody>
        </table>
    )
};

export default NoteList;
