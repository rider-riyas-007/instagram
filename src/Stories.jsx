import React, { useEffect, useState } from 'react'
import { data } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

function Stories() {
  const [stories,setStories]=useState([]);
  const navigate=useNavigate();
  let tot=stories.length;
  useEffect(()=>{
    fetch('http://localhost:3000/story')
    .then(data=>data.json())
    .then(data=>setStories(data)).catch(err=>console.log(err))
  },[])
  return (
   
    <div className='story d-flex mt-3'>
       <div className='d-none'></div>
      {stories.length>0?(stories.map((story)=>
        (<div  key={story.id}  className='mx-2' onClick={()=>{navigate(`/story/${story.id}/${tot}`)}}>
          <div className='gradient-border'>
          <img src={story.user.profileImage} alt="dp" className='story-dp rounded-circle' />
          
          </div>
          <p className='text-truncate' style={{width:"50px",fontSize:"12px",fontWeight:"500"}}>{story.user.username}</p>
        </div>) 
      )):(<b>Loading...</b>)}
    </div>
  )
}

export default Stories