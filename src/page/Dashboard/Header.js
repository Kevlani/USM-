import React from 'react'

function Header({ setisAdding }) {
  return (
    <header>
      <h1>User Management System</h1>
      <div style ={{marginTop: '30px',marginBottom:'5px'}}>
        <button onClick={() => setisAdding(true)} className='round-button'>Add User</button>
      </div>
    </header>
  )
}

export default Header;
