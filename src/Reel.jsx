
import React from 'react'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

function Reel() {
  const [Reels, setReels] = useState([]);
 

   
       
   
 
  
   
  
  function togglePlayPause(event) {
    if (event.target.tagName === "VIDEO") {
      let video = event.target;
      if (video.paused) {
        video.play();
      } else {
        video.pause();
      }
    }
  }

  useEffect(() => {
    

    axios.get('http://localhost:3000/reels').then(data => setReels(data.data)).catch(err => console.log(err));

    
    const scrollDown = (event) => {
      if (event.key === "ArrowDown") {
        event.preventDefault();
        window.scrollBy({
          top: 650,
          behavior: "smooth",
          
        });
      }
    };
    const scrollUp = (event) => {
      if (event.key === "ArrowUp") {
        event.preventDefault();
        window.scrollBy({
          top: -600,
          behavior: "smooth",
          
        });
      }
    };
    
    window.addEventListener("keydown", scrollDown);
    window.addEventListener("keyup", scrollUp);

    return () => {
      window.removeEventListener("keydown", scrollDown); // Cleanup on unmount
    };

  }, []

  );

  const toggleLike = async (id) => {
    setReels((prevReels) =>
      prevReels.map((reel) =>
        reel.id === id
          ? {
              ...reel,
              isRed: !reel.isRed,
              count: reel.isRed ? reel.count - 1 : reel.count + 1,
            }
          : reel
      )
    );

    try {
      const updatedReel = Reels.find((reel) => reel.id == id);
      await axios.patch(`http://localhost:3000/reels/${id}`, {
        isRed: !updatedReel.isRed,
        count: updatedReel.isRed ? updatedReel.count - 1 : updatedReel.count + 1,
      });
    } catch (error) {
      console.error("Error updating like status", error);
    }
  
  }
  

  return (
    <div  className=' d-flex flex-column align-items-center
       gap-4'>

      {Reels.length > 0 ? Reels.map(reel => {
        console.log(Reels);
         return (
        <div className='d-flex reels-shadow'>
          
          <video
            width="360"
            height="600"
            autoPlay
            loop
            playsinline
            muted
            key={reel.id}
            onClick={togglePlayPause}>
            <source src={reel.videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className='d-flex flex-column align-items-center gap-3 justify-content-end'>
         
            <div className='d-flex flex-column align-items-center fw-medium '><i className={`bi ${!reel.isRed ? "bi-heart" : "bi-heart-fill"} fs-2`}    style={{
                    color: !reel.isRed ? "black" : "red",
                    cursor: "pointer",
                    fontSize: "24px",
                  }} 
             onClick={() => toggleLike(reel.id)} ></i><div>{reel.count}</div></div>
            <div className='d-flex flex-column align-items-center fw-medium'><i className="bi bi-chat-dots fs-2"></i><div>3,042</div></div>
            <div className='d-flex flex-column align-items-center fw-medium  fs-2'><i className="bi bi-send"></i></div>
            <div className='d-flex flex-column align-items-center fw-medium'><i className="bi bi-bookmark fs-2"></i></div>
            <div className='d-flex flex-column align-items-center fw-medium'><i className="bi bi-three-dots fs-2"></i></div>
            <div>
              <img className=''style={{width:"40px",height:"40px",borderRadius:"5px"}} src={reel.userDp} alt="" />
            </div>

          </div>



        </div>)
      }) : (<div>Loading</div>)}

    </div>

  )
  }

export default Reel