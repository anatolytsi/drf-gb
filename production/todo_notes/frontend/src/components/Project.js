import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";


const ProjectItem = ({users, project, deleteProject}) => {
    let projectUsers = users?.filter((user) => project?.users.filter((prjUserId) => user.id === prjUserId));
    let projectUsersDispatched = [];
    for (let i = 0; i < project?.users.length; i++) {
        projectUsersDispatched.push({
            first_name: projectUsers?.[i].first_name,
            last_name: projectUsers?.[i].last_name,
            id: projectUsers?.[i].id
        })
    }
    return (
        <tr>
            <td>
                <Link to={`/projects/${project?.id}`} className='text-decoration-none'>{project?.name}</Link>
            </td>
            <td>
                {projectUsersDispatched.map((user) =>
                    <Link to={`/users/${user.id}`} className='text-decoration-none' key={user.id}>
                        {`${user.first_name} ${user.last_name}, `}
                    </Link>
                )}
            </td>
            <td>
                <button className='btn btn-danger' onClick={() => deleteProject(project?.id)} type='button'>
                    Delete
                </button>
            </td>
        </tr>
    )
};

const ProjectList = ({users, projects, deleteProject}) => {
    return (
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '30%'}}>Project name</th>
                <th scope='col' style={{'width': '55%'}}>Users</th>
                <th scope='col' style={{'width': '15%'}}>Action</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem key={/* name key is unique */project.name}
                                                    users={users}
                                                    project={project}
                                                    deleteProject={deleteProject}/>)}
            </tbody>
        </table>
    )
};

export default ProjectList;
