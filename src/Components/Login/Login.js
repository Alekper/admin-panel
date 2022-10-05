import './login.css'
import React from "react";
import logo from '../../Assets/img/AZAL.png'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';


export default function Login() {

    const navigate = useNavigate()
    const [adminName, setAdminName] = useState('')
    const [adminPass, setAdminPass] = useState('')
    const adminData = {
        dmin_id: adminName,
        password: adminPass
    }
    const signIn = () => {
        // navigate('/home/profile')
        fetch("http://sofi03.azal.az:8083/api/user/admlogin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminData)
        }).then((resp) => {
            resp.json().then((result) => {
                console.log(result);
            })
        })
    }


    return (
        <div id="login-container">
            <img src={logo} id='logo' alt='logo' />
            <label htmlFor='login-username' className="login-label">Username</label>
            <input type='text' className="login-input" onChange={(e) => { setAdminName(e.target.value) }} id="login-username" />
            <label htmlFor='login-password' className="login-label">Password</label>
            <input type='password' className="login-input" onChange={(e) => { setAdminPass(e.target.value) }} id="login-password" />
            <button className="login-btn" onClick={signIn}>Sign in</button>
        </div>
    )
}