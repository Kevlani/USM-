import React, { useState,useEffect} from 'react'
import Header from './Header';
import Swal from 'sweetalert2';
import List from './List';
import Add from './Add'
import Edit from './Edit';

import { Data } from '../../data';
import {doc,deleteDoc, collection,getDocs} from 'firebase/firestore';
import {db} from './firebase-config'
function Dashboard() {

    const [users, setusers] = useState(Data);
    const [selectuser, setselectusers] = useState(null);
    const [isAdding, setisAdding] = useState(false);
    const [isEditing, setisEditing] = useState(false);
    const userCollectionRef = collection(db,"users")

    useEffect(() => {
        const getusers = async()=>{
          const data =  await getDocs(userCollectionRef);
          setusers(data.docs.map((doc)=>({...doc.data(),id: doc.id})));
        }
        getusers()
    },[]);
    
             //  delete users
  const HandleDelete = async(id) => {
    const userDoc = doc(db, "users", id)
    await deleteDoc(userDoc);
    console.log("==>", id);
        Swal.fire({
            icon: 'Warning',
            title: 'Are You Sure',
            text: "You won't be able to revert this!",
            showCancelButton: true,
            confirmButtonText: "Yes,Delete It!",
            cancelButtonText: 'No, cancel',
        }).then(result => {
            if (result.value) {
                const [user] = users.filter(user => user.id === id);
                Swal.fire({
                    icon: 'success',
                    title: 'Deleted',
                    text: `${user.firstname} ${user.lastname}'s data has been deleted.`,
                    showConfirmButton: false,
                    timer: 1500,
                });
                setusers(users.filter(user => user.id !== id));
            }
        });
    }
 

    const updateuser = (id) => {
        const [user] = users.filter(user => user.id === id);
        setselectusers(user);
        setisEditing(true);
        console.log(id)
    }

    return (
        <div className="container">
            {!isAdding && !isEditing && (
                <>
                    <Header
                        setisAdding={setisAdding}
                    />
                    <List
                        users={users}
                        updateuser={updateuser}
                        HandleDelete={HandleDelete}
                    />
                </>
            )}
            {isAdding && (
                <Add
                    users={users}
                    setusers={setusers}
                    setisAdding={setisAdding}
                />
            )}
            {isEditing && (
                <Edit
                    users={users}
                    selectuser={selectuser}
                    setusers={setusers}
                    setisEditing={setisEditing}
                />
            )}
        </div>
    )
}

export default Dashboard;

