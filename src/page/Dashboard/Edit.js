import React, { useState, useEffect, useRef } from 'react'
import Swal from 'sweetalert2';
import { db } from './firebase-config'
import { doc, updateDoc,getDocs,collection } from "firebase/firestore"


function Edit({ users, selectuser, setusers, setisEditing }) {
  const id = selectuser.id;
  const [firstname, setFirstName] = useState(selectuser.firstname);
  const [lastname, setLastName] = useState(selectuser.lastname);
  const [email, setEmail] = useState(selectuser.email);
  const [gender, setGender] = useState(selectuser.gender);
  const [age, setAge] = useState(selectuser.age);
  const userCollectionRef = collection(db,"users")
  const textInput = useRef(null);
  const numberInput = useRef(null);
  
  useEffect(() => {
    const getusers = async()=>{
      const data =  await getDocs(userCollectionRef);
      setusers(data.docs.map((doc)=>({...doc.data(),id: doc.id})));
    }
    getusers()
    textInput.current.focus();
    numberInput.current.focus();
  }, []);
  //  edit  user
  const updateuser = async (id) => {
    const userDoc = doc(db,"users",id);
    const newfields = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      age: age,
      gender: gender
    }
    await updateDoc(userDoc, newfields)
    console.log(newfields)
  }
  //  end

  const handleUpdate = (e) => {
    e.preventDefault();
    if (firstname === '' || lastname === '') {
      return Swal.fire({
        icon: 'error',
        title: 'Error!',
        text: 'All fields are required',
        showConfirmButton: true
      });
    }
    else {
      const user = {
        id,
        firstname,
        lastname,
        email,
        age,
        gender,
      }

      for (let i = 0; i < users.length; i++) {
        if (users[i].id === id) {
          users.splice(i, 1, user);
          break;
        }
      }
      // setusers(users)
      setisEditing(false);

      Swal.fire({
        icon: 'Success',
        title: 'Updated!',
        text: `${firstname} ${lastname}'s data has been Updateed`,
        showConfirmButton: 'false',
        timer: 1500
      });
    }
  }

  return (
    <div className='small-container'>
      <form onSubmit={handleUpdate}>
        <h1>
          Edit user
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
          <input type='submit' onClick={updateuser} value='submit' />
        </div>
        <div>
          <input
            style={{ marginleft: '12px' }}
            className='muted-button'
            type='button'
            value='Cancel'
            onClick={() => setisEditing(false)}
          />
        </div>
      </form>
    </div>
  )
}

export default Edit
