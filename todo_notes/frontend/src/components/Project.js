import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Link} from "react-router-dom";


const ProjectItem = ({users, project}) => {
    let projectLink = `/projects/${project?.url.split('projects/')?.[1]}`;
    let projectUsers = users?.filter(
        (user) => project?.users?.filter((projectUserUrl) => projectUserUrl === user.url));
    let projectUsersDispatched = [];
    for (let i = 0; i < project?.users.length; i++) {
        projectUsersDispatched.push({
            first_name: projectUsers?.[i].first_name,
            last_name: projectUsers?.[i].last_name,
            link: `/users/${projectUsers?.[i].url.split('users/')?.[1]}`
        })
    }
    return (
        <tr>
            <td>
                <Link to={projectLink} className='text-decoration-none'>{project?.name}</Link>
            </td>
            <td>
                {projectUsersDispatched.map((user) =>
                    <Link to={user.link} className='text-decoration-none' key={user.link}>
                        {`${user.first_name} ${user.last_name}, `}
                    </Link>
                )}
            </td>
        </tr>
    )
};

const ProjectList = ({users, projects}) => {
    return (
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '20%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '30%'}}>Project name</th>
                <th scope='col' style={{'width': '70%'}}>Users</th>
            </tr>
            </thead>
            <tbody>
            {projects.map((project) => <ProjectItem key={/* name key is unique */project.name}
                                                    users={users}
                                                    project={project}/>)}
            </tbody>
        </table>
    )
};

export default ProjectList;
