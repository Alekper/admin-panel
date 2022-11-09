import React, { useMemo } from "react";
import profilePicture from '../../Assets/img/pp.png'



export default function AdminProfile() {
    // const [photoSource, setPhotoSource] = useState()
    const user = useMemo(() => localStorage.getItem('fullname'), [])
    return (
        <section className='main-container'>


            <div className="admin-profile">
                <div className='main-info'>
                    <img src={profilePicture} alt="Profile" className='home-profile' />
                    
                    <label htmlFor="admin-pp" id="pp-label">
                    <span>Change profile photo</span>
                    </label>
                    <input type="file" id="admin-pp" />
                    <div className='fullname'>{user}</div>
                </div>
                <div className="info">
                    <div className='info-div'><h3>E-mail:</h3><p>admin@azal.az</p></div>
                    <div className='info-div'><h3>Phone number:</h3><p>+9949999999</p></div>
                    <div className='info-div'><h3>Info:</h3><p>Info Info Info</p></div>
                    <div className='info-div'><h3>Info:</h3><p>Info Info Info</p></div>
                    <div className='info-div'><h3>Info:</h3><p>Info Info Info</p></div>

                    <div className='dot-div'>
                        <span className='dot'></span>
                        <span className='dot'></span>
                    </div>

                </div>
                
            </div>
        </section>
    )
}