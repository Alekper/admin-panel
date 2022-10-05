import './home.css'
import 'react-calendar/dist/Calendar.css';
import logo from '../../Assets/img/AZAL.png'
import profilePicture from '../../Assets/img/pp.png'
import React, { useState } from "react";
import createUserIcon from '../../Assets/icons/add-user.png'
import userListIcon from '../../Assets/icons/list.png'
import uploadDocumentIcon from '../../Assets/icons/doc.png'
import reportIcon from '../../Assets/icons/report.png'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom'





export default function Home() {
    const navigate = useNavigate()
    const [user, setUser] = useState('Admin Adminovich')





    return (
        <div id="home-container">
            <div className="home-navbar">
                <div className='navbar-profile'>
                    <button className='img-btn' onClick={() => navigate('/home/profile')}>
                        <img src={profilePicture} className='navbar-pp' alt="profile" />
                    </button>
                    <button className='name-btn' onClick={() => navigate('/home/profile')}>
                        {user}
                    </button>
                </div>
                <img src={logo} className='home-logo' alt="logo" />
            </div>
            <div className='flex'>
                <div className="home-menu">
                    <button onClick={()=>{navigate('/home/new')}}>
                        <img className='menu-icon' src={createUserIcon} alt="Create a new user" />
                    </button >
                    <button  onClick={()=>{navigate('/home/list')}}>
                        <img className='menu-icon' src={userListIcon} alt="List of users" />
                    </button>
                    <button>
                        <img className='menu-icon' src={uploadDocumentIcon} alt="Upload a document" />
                    </button>
                    <button>
                        <img className='menu-icon' src={reportIcon} alt="Report" />
                    </button>
                </div>
                <div className="main-container">
                    <Outlet />
                </div>

            </div>
            <Sidebar />
        </div>
    )
}