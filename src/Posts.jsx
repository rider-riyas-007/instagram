import React, { useEffect, useState } from 'react'


function Posts() {
  const [posts,setPosts]=useState([]);
  useEffect(()=>{
    fetch('http://localhost:3000/posts').then(data=>data.json()).then(data=>setPosts(data)).catch(err=>console.log(err));
  },[]);

  return (
    <div className='d-flex justify-content-center'>
{
posts.length>0?
(<div>{console.log(posts)}{posts.map((post)=><div className='my-3' key={post.id}>
 <div className='d-flex justify-content-between align-items-center'>
 <div className='d-flex my-3 align-items-center'>
    <img className='rounded-circle dp' src={post.user.profileImage} alt="profile-pic" />
    <h6 >{post.user.username}<span className='fs-4 ms-1 secondary'>.&nbsp;<span className='secodary fw-light fs-6'>{post.user.postedTime}</span></span></h6>
    
 </div>
 <i className='bi bi-three-dots my-3 secondary '></i>
 </div>
 <img className='image' src={post.imageUrl} alt="" />
 <div>
 <div className='d-flex justify-content-between fs-5 mt-2'>
 <div className='d-flex gap-3 '>
 <i className="bi bi-heart" style={{ fontWeight: "bold" }}></i>
<i className="bi bi-chat" style={{ fontWeight: "bold" }}></i>
<i className="bi bi-send" style={{ fontWeight: "bold" }}></i>

 
 </div>
 <div>
 <i className="bi bi-bookmark"></i>
 </div>
 </div>
 </div>
 <div>
    <b>{post.likeCount} Likes</b>
 </div>
 <p><b>{post.user.username}&nbsp;&nbsp;</b>{post.caption}</p>
 <hr />
</div>)}</div>)
:
(<div>Loading...</div>)
}
    </div>
  )
}

export default Posts