import React, { useEffect, useRef, useState } from 'react'
import Swal from 'sweetalert2';
import { db } from './firebase-config'
import {collection,addDoc, getDocs} from "firebase/firestore"
function Add({ users, setusers, setisAdding }) {

  const [firstname, setFirstName] = useState('');
  const [lastname, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [gender, setGender] = useState();
  const [age, setAge] = useState('');
  const userCollectionRef = collection(db,"users")

  const textInput = useRef(null);
  const numberInput = useRef(null);
//  show in table
  useEffect(() => {
    const getusers = async()=>{
      const data =  await getDocs(userCollectionRef);
      setusers(data.docs.map((doc)=>({...doc.data(),id: doc.id})));
    }
    getusers()
    textInput.current.focus();
    numberInput.current.focus();
  }, []);


// create user
const createusers = async()=>{
  await addDoc(userCollectionRef, {firstname :firstname,lastname: lastname,email: email, age: Number(age),gender: gender})
}
//  end

 
  const handleisAdd = (e) => {
    e.preventDefault();
    if (firstname === '' || lastname === '') {
      console.log("error handling");
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required',
        showConfirmButton: true
      });
    }
    else {
      console.log("add users", users);
      const id = users.length + 1;
      const newUser = {
        id,
        firstname,
        lastname,
        email,
        age,
        gender,

      }
      users.push(newUser);
      // setusers(users)
      setisAdding(false);

      Swal.fire({
        icon: 'Success',
        title: 'Added!',
        text: `${firstname} ${lastname}'s data has been Added`,
        showConfirmButton: 'false',
        timer: 1500
      });

    }

  }
  return (
    <div className='small-container'>
      <form onSubmit={handleisAdd}>
      {/*  add user */}

        <h1>
          Add user
        </h1>
        <label htmlFor='firstname'>First Name</label>
        <input
          id='firstname'
          type='text'
          ref={textInput}
          name="firstname"
          value={firstname}
          onChange={e => setFirstName(e.target.value)}
        />
        <label htmlFor='lastname'>Last Name</label>
        <input
          id='lastname'
          type='text'
          name="lastname"
          value={lastname}
          onChange={e => setLastName(e.target.value)}
        />
        <label htmlFor='email'>Email</label>
        <input
          id='email'
          type='email'
          name="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <label htmlFor='age'>Age</label>
        <input
          id='age'
          type='number'
          ref={numberInput}
          name="age"
          value={age}
          onChange={e => setAge(e.target.value)}
        />

        <label htmlFor='gender'>Gender</label>
        <input
          id='gender'
          type='text'
          ref={textInput}
          name="gender"
          value={gender}
          onChange={e => setGender(e.target.value)}
        />
        
        <div style={{ marginTop: '30px' }}>
        <button onClick={createusers}> Create User</button>
          {/* <input type='submit' onClick={handleisAdd} value='Submit' /> */}
        </div>
        <div>
          <input
            style={{ marginleft: '12px' }}
            className='muted-button'
            type='button'
            value='Cancel'
            onClick={() => setisAdding(false)}
          />
                {/* end */}
        </div>
      </form>
    </div>
  )
}

export default Add
