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
        [userId, setUserId] = useState()




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
        // fetch("https://633c9f5174afaef1640c2bad.mockapi.io/users")
        fetch("http://sofi03.azal.az:8083/api/user/getusers")
            .then((result) => {
                result.json()
                    .then((resp) => {
                        setUserArray(resp)
                        // console.log(resp);
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
        // console.log(keyword);

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
            fetch(`http://sofi03.azal.az:8083/api/user/deleteuser/${e}`, { method: 'DELETE' })
                // fetch(`http://sofi03.azal.az:8083/api/user/getusers${e}`, { method: 'DELETE' })
                .then((resp) => {
                    // console.log(resp);
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
            telefon: newPhone,
            password: newPass,
            tabel: userId,
            foto: 'aaa'
        }
        setShowUpdateForm(!showUpdateForm)
        // console.log(updateData);

        fetch(`http://sofi03.azal.az:8083/api/user/UpdateUser`, {
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
    const autoFill = (e) => {
        console.log(userId);
        fetch("http://sofi03.azal.az:8083/api/user/getusers")
            .then((result) => {
                result.json()
                    .then((resp) => {
                        console.log(resp);
                        resp.map(item => {
                            if (item.tabel === +userId) {
                                setNewName(item.name)
                                setNewSurname(item.surname)
                                setNewMail(item.email)
                                setNewPhone(item.telefon)
                                setNewPass(item.password)
                            }
                        })
                    })

            })
            .catch(error => {
                console.log(error.message);
            })
    }

    const clearState = () => {
        setNewName('')
        setNewSurname('')
        setNewMail('')
        setNewPhone('')
        setNewPass('')
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
                                    <button className='delete-btn' onClick={() => deleteHandler(item.tabel)}>
                                        <i className="fa-solid fa-trash"></i>

                                    </button>
                                    <button className='edit-btn' onClick={() => { setUserId(item.tabel); setShowUpdateForm(!showUpdateForm) }}>
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
                                <h2 ><i className="fa-solid icon fa-phone"></i>{item.telefon}</h2>
                                <h2 ><i className="fa-solid icon fa-key"></i>{item.password}</h2>
                            </div>
                        )
                    })) : name.length === 0 ? (userArray.map((item, i) => {
                        return (
                            <div className="user-card" key={i}>
                                <div className='icons-div'>
                                    <button className='delete-btn' onClick={() => deleteHandler(item.tabel)}>
                                        <i className="fa-solid fa-trash"></i>

                                    </button>
                                    <button className='edit-btn' onClick={() => { setUserId(item.tabel); setShowUpdateForm(!showUpdateForm) }}>
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
                                <h2 ><i className="fa-solid icon fa-phone"></i>{item.telefon}</h2>
                                <h2 ><i className="fa-solid icon fa-key"></i>{item.password}</h2>
                            </div>
                        )
                    })) : (<h1>No results found!</h1>)}
            </div>
            {
                showUpdateForm ?
                    <div className="update">
                        <h1>Edit someone</h1>
                        <input type="text" defaultValue={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Name...' />
                        <input type="text" defaultValue={newSurname} onChange={(e) => setNewSurname(e.target.value)} placeholder='Surname...' />
                        <input type="text" defaultValue={newMail} onChange={(e) => setNewMail(e.target.value)} placeholder='E-mail...' />
                        <input type="text" defaultValue={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder='Phone number...' />
                        <input type="text" defaultValue={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder='Password...' />
                        <button className='update-btn' onClick={updateHandler}>Update</button>
                        <button className='close-btn' onClick={() => { setShowUpdateForm(!showUpdateForm); clearState() }}>&#10006;</button>
                        <button className='fill-btn' onClick={() => autoFill()}>Fill</button>
                        {/* <button className='fill-btn'>Fill</button> */}

                    </div> :
                    null
            }
        </div>
    )
}