import './home.css'
import './ResponsiveHome.css'
import 'react-calendar/dist/Calendar.css';
import logo from '../../Assets/img/AZAL.png'
import profilePicture from '../../Assets/img/pp.png'
import React, { useEffect, useMemo } from "react";
import createUserIcon from '../../Assets/icons/add-user.png'
import userListIcon from '../../Assets/icons/list.png'
import uploadDocumentIcon from '../../Assets/icons/doc.png'
import reportIcon from '../../Assets/icons/report.png'
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar';
import { useNavigate } from 'react-router-dom'





export default function Home() {
    const navigate = useNavigate()

    const fullName = useMemo(() => localStorage.getItem('fullname'), [])

    useEffect(() => {
        if (!fullName)
            navigate('/login')
    }, [fullName, navigate])


    return (
        <div id="home-container">
            <div className="home-navbar">
                <div className='navbar-profile'>
                    <button className='img-btn' onClick={() => navigate('/profile')}>
                        <img src={profilePicture} className='navbar-pp' alt="profile" />
                    </button>
                    <button className='name-btn' onClick={() => navigate('/profile')}>
                        {fullName}
                    </button>
                </div>
                <img src={logo} className='home-logo' alt="logo" />
            </div>
            <div className='flex'>
                <div className="home-menu">
                    <button onClick={() => { navigate('/new') }}>
                        <img className='menu-icon' src={createUserIcon} alt="Create a new user" />
                    </button >
                    <button onClick={() => { navigate('/list') }}>
                        <img className='menu-icon' src={userListIcon} alt="List of users" />
                    </button>
                    <button onClick={() => navigate('/upload-report')}>
                        <img className='menu-icon' src={uploadDocumentIcon} alt="Upload a document" />
                    </button>
                    <button>
                        <img className='menu-icon' src={reportIcon} alt="Report" />
                    </button>
                </div>
                <div className="main-container">
                    <Outlet />
                </div>

                <div className="home-widgets">

                    <Sidebar />
                </div>
            </div>
        </div>
    )
}