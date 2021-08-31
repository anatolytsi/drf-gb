import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const ProjectItem = ({project}) => {
    return (
        <tr>
            <td>
                <a className='text-decoration-none' href={project?.repositoryUrl}>{project?.name}</a>
            </td>
            <td>
                {project?.users}
            </td>
        </tr>
    )
};

const ProjectList = ({projects}) => {
    return (
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '30%'}}>Project name</th>
                <th scope='col' style={{'width': '70%'}}>Users</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem key={/* name key is unique */project.name} project={project}/>)}
            </tbody>
        </table>
    )
};

export default ProjectList;
