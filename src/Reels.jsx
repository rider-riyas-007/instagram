import React from 'react'
import Sidebar from './Sidebar'
import { useEffect } from 'react'
import axios from 'axios'
import Reel from './Reel'

function Reels() {
   
  return (
    <div >
        <Sidebar/>
         <Reel/>
    </div>
  )
}

export default Reels