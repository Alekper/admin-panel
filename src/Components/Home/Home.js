import './home.css'
import './ResponsiveHome.css'
import 'react-calendar/dist/Calendar.css';
import logo from '../../Assets/img/AZAL.png'
import profilePicture from '../../Assets/img/pp.png'
import React, { useEffect, useMemo, useState } from "react";
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
    const [menuStatus, setMenuStatus] = useState(false)
    useEffect(() => {
        if (!fullName)
            navigate('/login')
    }, [fullName, navigate])
    const logOut = () =>{
        localStorage.clear()
        navigate('/login')

    }

    return (
        <div id="home-container">
            <div className="home-navbar">
                {
                    menuStatus ?
                <button className='drop-arrow' onClick={()=>setMenuStatus(!menuStatus)}>&#8673;</button>
                : <button className='drop-arrow' onClick={()=>setMenuStatus(!menuStatus)}>&#8675;</button>

                }
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
                <div className="home-menu" style={{'top': menuStatus ? '50%' : '-10%'}}>
                    <button onClick={() => { navigate('/new') }}>
                        <h1 className="responsive-menu-item">New user</h1>
                        <img className='menu-icon' src={createUserIcon} alt="Create a new user" />
                    </button >
                    <button onClick={() => { navigate('/list') }}>
                        <h1 className="responsive-menu-item">List of users</h1>

                        <img className='menu-icon' src={userListIcon} alt="List of users" />
                    </button>
                    <button onClick={() => navigate('/upload-report')}>
                        <h1 className="responsive-menu-item">Upload a manual</h1>

                        <img className='menu-icon' src={uploadDocumentIcon} alt="Upload a document" />
                    </button>
                    <button>
                        <h1 className="responsive-menu-item">Report</h1>

                        <img className='menu-icon' src={reportIcon} alt="Report" />
                    </button>
                <button className="responsive-menu-item" onClick={logOut}>Log out</button>

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