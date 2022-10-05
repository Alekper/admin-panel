import './UserList.css'
import React, { useState } from "react"
import { useEffect } from "react"

export default function UserList() {
    const [userArray, setUserArray] = useState([]),
        [name, setName] = useState(''),
        [foundUsers, setFoundUsers] = useState(userArray),
        [showUpdateForm, setShowUpdateForm] = useState(false),
        [newName, setNewName] = useState(''),
        [newSurname, setNewSurname] = useState(''),
        [newMail, setNewMail] = useState(''),
        [newPhone, setNewPhone] = useState(''),
        [newPass, setNewPass] = useState(''),
        [userId, setUserId]=useState()




    // useEffect(() => {

    //     fetch("https://633c9f5174afaef1640c2bad.mockapi.io/users")
    //         .then((result) => {
    //             result.json()
    //                 .then((resp) => {
    //                     setUserArray(resp)
    //                     console.log(resp);
    //                 })

    //         })
    //         .catch(error => {
    //             console.log(error.message);
    //         })
    // }, [])

    const getUsers = () => {
        fetch("https://633c9f5174afaef1640c2bad.mockapi.io/users")
            .then((result) => {
                result.json()
                    .then((resp) => {
                        setUserArray(resp)
                        console.log(resp);
                    })

            })
            .catch(error => {
                console.log(error.message);
            })
    }

    useEffect(() => {
        getUsers()
    }, [])



    const filter = (e) => {
        const keyword = e.target.value;
        console.log(keyword);

        if (keyword !== '') {
            const results = userArray.filter((user) => {
                return user.name.toLowerCase().startsWith(keyword.toLowerCase());
            });
            setFoundUsers(results);
        } else {
            setFoundUsers(userArray);
        }

        setName(keyword);
    };


    const deleteHandler = (e) => {
        if (window.confirm('Confirm user removal!')) {
            // fetch(`http://sofi03.azal.az:8083/api/user/deleteuser/${e}`, { method: 'DELETE' })
            fetch(`https://633c9f5174afaef1640c2bad.mockapi.io/users/${e}`, { method: 'DELETE' })
                .then(() => {
                    alert('Delete successful')
                    getUsers()
                })
        }
        else {
            alert('The user has not been deleted!')
        }


    }




    const updateHandler = (e) => {
        setUserId(e)
        let updateData = {
            name: newName,
            surname: newSurname,
            email: newMail,
            phone: newPhone,
            password: newPass
        }
        setShowUpdateForm(!showUpdateForm)
        console.log(e);

        fetch(`https://633c9f5174afaef1640c2bad.mockapi.io/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Accept': 'application/json',
                'Content-type': 'application/json'
            },
            body: JSON.stringify(updateData)
        }).then(() => {
            getUsers()
            alert('User updated successfully')
        })

    }



    return (
        <div className="user-list-main">

            <div className="inp-div">
                <input
                    type="search"
                    value={name}
                    onChange={(e) => filter(e)}
                    className="search-input"
                    placeholder="Search..." />
            </div>
            <div className="card-div">
                {foundUsers && foundUsers.length > 0 ? (
                    foundUsers.map((item, i) => {

                        return (

                            <div className="user-card" key={i}>
                                <div className='icons-div'>
                                    <button className='delete-btn' onClick={() => deleteHandler(item.id)}>
                                        <i className="fa-solid fa-trash"></i>

                                    </button>
                                    <button className='edit-btn' onClick={() => updateHandler(item.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>

                                    </button>
                                </div>
                                <img src={item.image} className="profile-picture" alt='profile' />
                                <span className='dot'></span>
                                <span className='dot'></span>
                                <div className='dot-div'>
                                    <span className='dot'></span>
                                    <span className='dot'></span>
                                </div>
                                <h1 ><i className="fa-solid icon fa-user"></i>{item.name + ' ' + item.surname}</h1>
                                <h2 ><i className="fa-solid icon fa-id-card"></i>{item.tabel}</h2>
                                <h2 ><i className="fa-solid icon fa-envelope"></i>{item.email}</h2>
                                <h2 ><i className="fa-solid icon fa-phone"></i>{item.phone}</h2>
                                <h2 ><i className="fa-solid icon fa-key"></i>{item.password}</h2>
                            </div>
                        )
                    })) : name.length === 0 ? (userArray.map((item, i) => {
                        return (
                            <div className="user-card" key={i}>
                                <div className='icons-div'>
                                    <button className='delete-btn' onClick={() => deleteHandler(item.id)}>
                                        <i className="fa-solid fa-trash"></i>

                                    </button>
                                    <button className='edit-btn' onClick={() => updateHandler(item.id)}>
                                        <i className="fa-solid fa-pen-to-square"></i>

                                    </button>
                                </div>
                                <img src={item.image} className='profile-picture' alt="profile" />

                                <div className='dot-div'>
                                    <span className='dot'></span>
                                    <span className='dot'></span>
                                </div>
                                <h1 ><i className="fa-solid icon fa-user"></i>{item.name + ' ' + item.surname}</h1>
                                <h2 ><i className="fa-solid icon fa-id-card"></i>{item.tabel}</h2>
                                <h2 ><i className="fa-solid icon fa-envelope"></i>{item.email}</h2>
                                <h2 ><i className="fa-solid icon fa-phone"></i>{item.phone}</h2>
                                <h2 ><i className="fa-solid icon fa-key"></i>{item.password}</h2>
                            </div>
                        )
                    })) : (<h1>No results found!</h1>)}
            </div>
            {
                showUpdateForm ?
                    <div className="update">
                        <h1>Edit someone</h1>
                        <input type="text" value={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Name...' />
                        <input type="text" value={newSurname} onChange={(e) => setNewSurname(e.target.value)} placeholder='Surname...' />
                        <input type="text" value={newMail} onChange={(e) => setNewMail(e.target.value)} placeholder='E-mail...' />
                        <input type="text" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder='Phone number...' />
                        <input type="text" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder='Password...' />
                        <button className='update-btn' onClick={updateHandler}>Update</button>
                        <button className='close-btn' onClick={() => setShowUpdateForm(!showUpdateForm)}>&#10006;</button>
                    </div> :
                    null
            }
        </div>
    )
}