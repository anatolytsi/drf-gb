import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';


const UserItem = ({user}) => {
    return (
        <tr>
            <td>
                {user?.first_name}
            </td>
            <td>
                {user?.last_name}
            </td>
            <td>
                {user?.email}
            </td>
            <td>
                {user?.username}
            </td>
        </tr>
    )
};

const UserList = ({users}) => {
    return (
        <table className='table table-striped table-borderless mx-auto w-auto' style={{'width': '50%'}}>
            <thead>
            <tr>
                <th scope='col' style={{'width': '15%'}}>First name</th>
                <th scope='col' style={{'width': '25%'}}>Last name</th>
                <th scope='col' style={{'width': '30%'}}>Email</th>
                <th scope='col' style={{'width': '30%'}}>Username</th>
            </tr>
            </thead>
            <tbody>
            {users.map((user) => <UserItem key={/* email key is unique */user.email} user={user}/>)}
            </tbody>
        </table>
    )
};

export default UserList;
