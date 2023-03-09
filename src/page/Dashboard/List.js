import React from 'react'

function List({ users, updateuser, HandleDelete }) {


  return (
    <div className='contain-table'>
      <table className='striped-table'>
        <thead>
          <tr>
            <th>No</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>Gender</th>
            <th colSpan={2} className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, i) => (
              <tr key={user.id}>
                <td>{i + 1}</td>
                <td>{user.firstname}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.gender}</td>
                <td className="text-right">
                  <button onClick={() => updateuser(user.id)}>Edit</button>
                </td>
                <td className='text-left'>
                  <button onClick={() => HandleDelete(user.id)} className="button muted-button">Delete</button>
                </td>
              </tr>
            ))
          ) : (<tr>
            <td colSpan={7}>
              No users
            </td>
          </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default List
