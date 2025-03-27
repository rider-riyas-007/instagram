import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import ViewStory from './ViewStory.jsx'
import Profile from './Profile.jsx'
import Reels from './Reels.jsx'
import Explore from './Explore.jsx'
import Search from './Search.jsx'
const router = createBrowserRouter([
  {
   path:'/',
    element:<App />
  },
  {
    path:'/story/:id/:tot',
    element:<ViewStory/>
  },
  {
    path:'/profile',
    element:<Profile/>
  },
  {
    path:'/reels',
    element:<Reels/>
  },
  {
    path:'/explore',
    element:<Explore/>
  },
  {
    path:'/search',
    element:<Search/>
  }
])
createRoot(document.getElementById('root')).render(
  
   <RouterProvider router={router}/>
  
)
