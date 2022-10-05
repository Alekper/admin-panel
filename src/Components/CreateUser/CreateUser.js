import './CreateUser.css'
import React, { useState } from "react";
import profilePicture from '../../Assets/img/pp.png'

export default function CreateUser() {
    const
        [name, setName] = useState(),
        [surname, setSurname] = useState(),
        [email, setEmail] = useState(),
        [phone, setPhone] = useState(),
        [tabel, setTabel] = useState(),
        [password, setPassword] = useState()

    const createUser = () => {
        let userData = { name, surname, email, phone, tabel, password }
        fetch("https://633c9f5174afaef1640c2bad.mockapi.io/users", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        }).then((resp) => {
            resp.json().then((result) => {
                alert('User created successfully!')
                window.location.reload()
            })
        })
    }
    return (
        <div className="user-container">
            <div>
                <img src={profilePicture} alt="Profile" className='profile' />
                <label htmlFor="admin-pp" id="pp-label">
                    <span>Change profile photo</span>
                </label>
                <input type="file" id="admin-pp" />
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