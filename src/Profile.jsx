import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Profile() {
    const [profile,setProfile]=useState(null);
    const [followers,setFollowers]=useState([]);
    const [unfollowed,setUnfollowed]=useState(0);
    useEffect(()=>{
        axios.get('http://localhost:3000/profile').then(data=>{setProfile(data.data)}).catch(err=>console.log(err))

        axios.get('http://localhost:3000/followers').then(data=>setFollowers(data.data)).catch(err=>console.log(err))
    },[unfollowed])


    function HandleOnChange(e){
        setProfile(prev=>({
            ...prev,
            [e.target.name]:e.target.value
        }))
    }
    const handleUpdate=async ()=>{
        axios.put('http://localhost:3000/profile',profile).then(console.log("updated")).catch(err=>console.log(err));
    }
    const handleUnfollow=async (id)=>{
        axios.delete(`http://localhost:3000/followers/${id}`).then(setUnfollowed(!unfollowed)).catch(err=>console.log(err))
    }
  return (
    <div className='m-5'>
        {profile?(
            <div>
                <img src={profile.profileImage} alt="profile pic" className='profile rounded-circle' />
               <h5>{profile.username}</h5>
               <input type="text"
                      value={profile.username}
                      name='username'
                      className='form-control my-4'
                      onChange={HandleOnChange}
                />
                <input type="text"
                       name='profileImage'
                       value={profile.profileImage}
                       className='form-control my-4'
                       onChange={HandleOnChange}
                 />
                 <button className='btn btn-primary' onClick={handleUpdate}>Update</button>
            </div>
           ):(
           <b>Loading Profile...</b>
           )}
           {followers.length>0?(followers.map(follower=><div className='d-flex' key={follower.id}>{follower.username} <button className='btn btn-secondary ms-auto my-2' onClick={()=>{handleUnfollow(follower.id)}}>UnFollow</button></div>)):(<b>No Followers Yet.</b>)}
    </div>
  )
}

export default Profile