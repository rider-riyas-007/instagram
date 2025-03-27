import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar'
import axios from 'axios'

function Explore() {
  const [explores,setExplores]=useState([]);
  useEffect(()=>{
    axios.get("http://localhost:3000/explore").then(response=>setExplores(response.data)).catch(err=>console.log(err));
  })
  return (
    
    <div className='d-flex gap-1'>
     <div className='w-25 me-3' style={{borderRight:"1px solid lightgray"}}>
     <Sidebar/>
     </div>
     
     <div className='d-flex flex-column gap-1 w-75 mt-5'>
     {explores.length>0?(explores.map(explore=>(explore.id%2!=0?(<div  className='d-flex gap-1'>
    
    <div className='bg-light d-flex  flex-column gap-1 ' >
      <div  className='bg-dark' style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl}></video></div>
      <div className="bg-dark"  style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl2}></video></div>
   </div>

  <div className='bg-light d-flex  flex-column gap-1 '>
   <div className="bg-dark" style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl2}></video></div>
   <div className="bg-dark" style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl}></video></div>
  </div>
 
 <div className='bg-dark' style={{width:"300px",height:"600px"}}>
 <video style={{width:"100%",height:"100%"}} src={explore.videoUrl}></video>
 </div>
</div>):(<div  className='d-flex gap-1'>
  <div className='bg-dark' style={{width:"300px",height:"600px"}}>
    <video style={{width:"100%",height:"100%"}} src={explore.videoUrl}></video>
 </div>
    <div className='bg-light d-flex  flex-column gap-1 ' >
      <div  className='bg-dark' style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl}></video></div>
      <div className="bg-dark"  style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl2}></video></div>
   </div>

  <div className='bg-light d-flex  flex-column gap-1 '>
   <div className="bg-dark" style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl2}></video></div>
   <div className="bg-dark" style={{width:"300px",height:"300px"}}><video style={{width:"100%",height:"100%"}} src={explore.videoUrl}></video></div>
  </div>
 
 
</div>)))):(<div>Loading...</div>)}
     </div>

    </div>
  )
}

export default Explore