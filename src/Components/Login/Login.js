import './login.css'
import React from "react";
import logo from '../../Assets/img/AZAL.png'
import loader from '../../Assets/img/loading.gif'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react';

export default function Login() {

    const navigate = useNavigate()
    const [loaderStatus, setLoaderStatus] = useState(false)
    const [adminName, setAdminName] = useState('')
    const [adminPass, setAdminPass] = useState('')
    const adminData = {
        admin_id: adminName,
        password: adminPass
    }

    // admin1
    // 123123z
    const signIn = () => {
        setLoaderStatus(true)

        fetch("http://sofi03.azal.az:8083/api/user/admlogin", {
            method: "POST",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminData)
        }).then((resp) => {
            while (!resp) {
                // console.log('a');
            }
            resp.json().then((result) => {
                setLoaderStatus(false)
                if (result.admin_id === adminName) {
                    localStorage.setItem('username', result.admin_id)
                    localStorage.setItem('fullname', `${result.name} ${result.surname}`)
                    navigate('/home/profile')
                } else {
                    setLoaderStatus(false)

                    alert('Incorrect login or password!')
                }

            })
        })
    }


    return (
        <div id="login-container">
            <div className="loader-container" style={{ display: !loaderStatus ? 'none' : 'flex' }}>
                <img src={loader} id='loader' alt='loader' />
            </div>
            <img src={logo} id='logo' alt='logo' />
            <label htmlFor='login-username' className="login-label">Username</label>
            <input type='text' className="login-input" onChange={(e) => { setAdminName(e.target.value) }} id="login-username" />
            <label htmlFor='login-password' className="login-label">Password</label>
            <input type='password' className="login-input" onChange={(e) => { setAdminPass(e.target.value) }} id="login-password" />
            <button className="login-btn" onClick={signIn}>Sign in</button>
        </div>
    )
}