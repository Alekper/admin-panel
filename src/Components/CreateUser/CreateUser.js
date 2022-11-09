import './CreateUser.css'
import React, { useState } from "react";
import profilePicture from '../../Assets/img/pp.png'
import axios from 'axios';

export default function CreateUser() {
    const
        [Name, setName] = useState(),
        [Surname, setSurname] = useState(),
        [Email, setEmail] = useState(),
        [Telefon, setPhone] = useState(),
        [Tabel, setTabel] = useState(),
        [Password, setPassword] = useState(),
        [Foto, setFoto] = useState([])

    const setProfilePicture = (e) => {
        const len = e.target.files.length;
        for (let i = 0; i < len; i++) {

            if (e.target.files) {
                setFoto(e.target.files[0])
                console.log(Foto)
            } else {
                console.log('error');
            }
        }

    }

    const handlePhoto = async () => {
        // event.preventDefault()
        const formData = new FormData();
        formData.append("selectedFile", Foto);
        try {
            const response = await axios({
                method: "post",
                url: `http://sofi03.azal.az:8083/api/user/uploadimage/${Tabel}`,
                data: formData,
                headers: { "Content-Type": "multipart/form-data" },
            });
        } catch (error) {
            console.log(error)
        }
    }

    const createUser = () => {
        let userData = { Tabel, Name, Surname, Foto, Email, Telefon, Password }
        console.log(userData);

handlePhoto()

        fetch("http://sofi03.azal.az:8083/api/user/createuser", {
            method: "POST",
            headers: {
                'Accept': '',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((resp) => {
            resp.json().then((result) => {
                alert('User created successfully!')
                window.location.reload()
                console.log(result);
            }).catch(error => {
                console.log(error);
            })
        })
    }




    return (
        <div className="user-container">
            <div>
                    <div className="profile">
                        <img src={profilePicture} alt="Profile" className='profile-pic' />

                        <label htmlFor="admin-pp" id="pp-label">
                            <span>Change profile photo</span>
                        </label>
                        <input type="file" id="admin-pp" onChange={(e) => setProfilePicture(e)} />
                        <button type="submit">submit</button>
                    </div>
            </div>
            <div className='user-form'>
                <div>

                    <label htmlFor="name">Name</label>
                    <input type="text" className='user-input' onChange={(e) => setName(e.target.value)} name="name" id="name" />
                </div>
                <div>
                    <label htmlFor="surname">Surname</label>
                    <input type="text" className='user-input' onChange={(e) => setSurname(e.target.value)} name="surname" id="surname" />
                </div>
                <div>
                    <label htmlFor="e-mail">E-mail</label>
                    <input type="text" className='user-input' onChange={(e) => setEmail(e.target.value)} name="E-mail" id="e-mail" />
                </div>
                <div>
                    <label htmlFor="telephone">Telephone</label>
                    <input type="text" className='user-input' onChange={(e) => setPhone(e.target.value)} name="Telephone" id="telephone" />
                </div>
                <div>
                    <label htmlFor="personnel-number">Personnel number</label>
                    <input type="text" className='user-input' onChange={(e) => setTabel(e.target.value)} name="Personnel number" id="personnel-number" />
                </div>
                <div>
                    <label htmlFor="password">Password</label>
                    <input type="text" className='user-input' onChange={(e) => setPassword(e.target.value)} name="Password" id="password" />
                </div>
            </div>
            <button className='create-btn' onClick={createUser}>Create</button>
        </div>
    )
}