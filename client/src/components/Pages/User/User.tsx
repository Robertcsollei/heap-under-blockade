import React, {useState, useEffect} from 'react'

import {Users, UserProfile} from '../../../interfaces'

function User() {
   const [user, setUser] = useState<UserProfile>()
    let currentUser = window.location.pathname.split("/")[2]

    useEffect(() => {
        async function fetchData() {
        
            let profile = `${process.env.REACT_APP_API}/user/${currentUser}`
            const response = await fetch(profile);
            const data = await response.json();
           console.log(data)

            let roleUrl = `${process.env.REACT_APP_API}/role/${data.UserRole}`
            const roleRes = await fetch(roleUrl);
            const roleData = await roleRes.json();

            let diffTime = Math.abs(new Date().getTime() - new Date(Date.parse(data.RegistrationDate)).getTime())
            let difference =  diffTime / (1000 * 3600 * 24)
            let newTime = Math.round(difference)

            
            let newUser : UserProfile = {
                ProfileImage: data.ProfileImage,
                UserName: data.UserName,
                Role: roleData.RoleName,
                Email: data.Email,
                Description: data.Description,
                RegistrationDate: newTime
            }
            setUser(newUser)
            }
            
            fetchData()
    }, [])

    return(
        <>
            {user && (
                 <div className="profile_info">
                     <div className="head">
                            <div className="profileImage">
                                <img src={user.ProfileImage} alt={user.UserName} />
                            </div>
                        
                            <h4 className="profile_name">{user.UserName}</h4>
                     </div>
                    <div className="details">
                    <p><span className="detail-item">Role:</span> {user.Role}</p>
                    <p><span className="detail-item">Email:</span> {user.Email}</p>
                    <p><span className="detail-item">About myself:</span> {user.Description}</p>
                    <p><span className="detail-item">Registered:</span> {user.RegistrationDate} days ago</p>
                    </div>
                    
 
             </div>
            )}
          
            
                  
           
        </>
    )
}

export default User