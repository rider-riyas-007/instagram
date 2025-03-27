import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Sidebar() {
    const navigate=useNavigate();
const [dis,setDis]=useState(null);
    let searchBox;
    function hideUnSeek(){
        searchBox = document.getElementById("search-box");
    
        // Toggle display between 'block' and 'none'
        searchBox.style.display = (searchBox.style.display === "block") ? "none" : "block";
        setDis(searchBox.style.display);

    }

    return (
        <div className='m-3 fw-medium fs-5 position-fixed d-flex '>
           <div>
           <div className='d-flex flex-column gap-3'>
               
           {dis=== "block"?(<img className='logo-text pe-1 pt-1' src="src\assets\instagram-logo.png"  style={{width:"30px",height:"30px"}} alt="" />):(<img className='logo-text' src="src\assets\Instagram-text.png" alt="" />)}
               <div onClick={()=>{navigate('/')}}><i className="bi bi-house-door"></i>Home</div>
               <div onClick={hideUnSeek}><i className="bi bi-search"></i>Search</div>
               <div onClick={()=>{navigate('/explore')}}><i className="bi bi-compass"></i>Explore</div>
               <div onClick={()=>{navigate('/reels')}}><i className="bi bi-file-play"></i>Reels</div>
               <div><i className="bi bi-chat-dots"></i>Messages</div>
               <div><i className="bi bi-heart"></i>Notifications</div>
               <div><i className="bi bi-plus-square"></i>Create</div>
               <div onClick={()=>{navigate('/profile')}}><i className="bi bi-person-circle"></i>Profile</div>

           </div>
           
           <div className='position-fixed bottom-0 d-flex flex-column gap-3'>
               <div><i className="bi bi-threads"></i>Threads</div>
               <div className='mb-3'><i className="bi bi-list"></i>More</div>
           </div>
           </div>
           <div id="search-box" className='bg-light pe-5 position-fixed px-3 align-items-center ' style={{left:"45px",top:"0",borderRadius:"5px",boxShadow:" 4px 4px 10px rgba(0, 0, 0, 0.2);",height:"100vh"}}>
            <h3 className='py-3'>Search </h3>
            <input type="text" placeholder='Search' style={{fontSize:"15px",width:"400px"}} className='secondary-bg px-2 py-2 '   />
            <hr />
            <p style={{fontSize:"15px"}}> Recent</p>
            <div className='d-flex flex-column justify-content-center align-items-center ' style={{height:"50vh"}}><small style={{fontSize:"13px"}}>No recent searches</small></div>

           </div>



        </div>
    );

}

export default Sidebar