import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {RouterProvider,} from "react-router";
import AuthProvider from './context/Provider/AuthProvider';
import { router } from './routes/router';



createRoot(document.getElementById('root')).render(
  <StrictMode>
       <div className='urbanist-font '>
         <AuthProvider>
           <RouterProvider router={router} />
        </AuthProvider>
       </div>
  </StrictMode>,
)
