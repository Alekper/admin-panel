import React from "react";
// import clockFace from '../../Assets/icons/clock.png'
import Calendar from 'react-calendar'
import AnalogClock from 'analog-clock-react';
import { useNavigate } from 'react-router-dom'


export default function Sidebar() {
    const navigate = useNavigate()

    const getDay = (dateStr, locale) => {
        let date = new Date(dateStr)
        return date.toLocaleDateString(locale, { weekday: 'long' })
    }



    let day = new Date()
    let weekday = getDay(day, 'en-EN')
    let today = day.getDate() + '/' + (day.getMonth() + 1) + '/' + day.getFullYear()
    let options = {
        width: "220px",
        border: true,
        borderColor: "#172c52",
        baseColor: "#459cff",
        centerColor: "#459cff",
        centerBorderColor: "#172c52",
        handColors: {
            second: "#172c52",
            minute: "#172c52",
            hour: "#172c52"
        }
    }

    const logOut = () =>{
        localStorage.clear()
        navigate('/login')

    }

    return (
        <div className="sidebar">
            <div id='line'>
                <div className="date">
                    <p className='weekday'>{weekday}</p>
                    <p className='today'>{today}</p>
                </div>
            </div>
            <div className="side-container">

                <div className="widgets">
                    {/* <img src={clockFace} alt="Clock face" className="watch-face" /> */}
                    <AnalogClock {...options} />

                    <Calendar />
                </div>
                <button id="logout" onClick={logOut}>Log out</button>
            </div>
        </div>
    )
}