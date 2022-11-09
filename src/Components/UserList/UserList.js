import './UserList.css'
import React, { useState } from "react"
import { useEffect } from "react"
// import { isContentEditable } from '@testing-library/user-event/dist/utils'
import axios from 'axios'


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
        [userId, setUserId] = useState(),
        [photo, setPhoto] = useState(),
        [editHeader, setEditHeader] = useState('')
    const regex = /(files)\\\w+[a-zA-Z.\\]*/g,
        [Foto, setFoto] = useState([])

    const setProfilePicture = (e) => {
        const len = e.target.files.length;
        for (let i = 0; i < len; i++) {

            if (e.target.files) {
                setFoto(e.target.files[0])
                console.log(Foto)
            } else {
                alert('error');
            }
        }

    }

    const handlePhoto = async () => {
        const formData = new FormData();
        formData.append("selectedFile", Foto);
        try {
            const response = await axios({
                method: "post",
                url: `http://sofi03.azal.az:8083/api/user/uploadimage/${userId}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
    }

    const getUsers = () => {
        fetch("http://sofi03.azal.az:8083/api/user/getusers")
            .then((result) => {
                result.json()
                    .then((resp) => {
                        setUserArray(resp)
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
        handlePhoto()
        setUserId(e)
        let updateData = {
            name: newName,
            surname: newSurname,
            email: newMail,
            telefon: newPhone,
            password: newPass,
            tabel: userId,
            foto: photo
        }
        setShowUpdateForm(!showUpdateForm)

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
    const autoFill = () => {

        console.log(userId);
        fetch("http://sofi03.azal.az:8083/api/user/getusers")
            .then((result) => {
                result.json()
                    .then((resp) => {
                        resp.map(item => {
                            if (item.tabel === userId) {
                                setNewName(item.name)
                                setNewSurname(item.surname)
                                setNewMail(item.email)
                                setNewPhone(item.telefon)
                                setNewPass(item.password)
                                setPhoto(`http://sofi03.azal.az:8083/${item.foto.match(regex)}`)
                            }
                            return 1
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
                                    <button className='edit-btn' onClick={() => { setUserId(item.tabel); setEditHeader(item.name + ' ' + item.surname); setShowUpdateForm(!showUpdateForm) }}>
                                        <i className="fa-solid fa-pen-to-square"></i>

                                    </button>
                                </div>
                                <img src={`http://sofi03.azal.az:8083/${item.foto.match(regex)}`} className="profile-picture" alt='profile' />
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
                                    <button className='edit-btn' onClick={() => { setUserId(item.tabel); setEditHeader(item.name + ' ' + item.surname); setShowUpdateForm(!showUpdateForm) }}>
                                        <i className="fa-solid fa-pen-to-square"></i>

                                    </button>
                                </div>
                                <img src={`http://sofi03.azal.az:8083/${item.foto.match(regex)}`} className='profile-picture' alt="profile" />

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
                        <h1>Edit {editHeader}</h1>
                        <input type="text" className='update-input' defaultValue={newName} onChange={(e) => setNewName(e.target.value)} placeholder='Name...' />
                        <input type="text" className='update-input' defaultValue={newSurname} onChange={(e) => setNewSurname(e.target.value)} placeholder='Surname...' />
                        <input type="text" className='update-input' defaultValue={newMail} onChange={(e) => setNewMail(e.target.value)} placeholder='E-mail...' />
                        <input type="text" className='update-input' defaultValue={newPhone} onChange={(e) => setNewPhone(e.target.value)} placeholder='Phone number...' />
                        <input type="text" className='update-input' defaultValue={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder='Password...' />
                                <label htmlFor="admin-pp" id="up-pp-label">
                                    Change profile photo
                                </label>
                                <input type="file" id="admin-pp" onChange={(e) => setProfilePicture(e)} />
                        <button className='update-btn' onClick={updateHandler}>Update</button>
                        <button className='close-btn' onClick={() => { setShowUpdateForm(!showUpdateForm); clearState() }}>&#10006;</button>
                        <button className='fill-btn' onClick={() => autoFill()}>Fill</button>

                    </div> :
                    null
            }
        </div>
    )
}