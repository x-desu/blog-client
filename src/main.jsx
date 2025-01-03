import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {createBrowserRouter,RouterProvider} from "react-router-dom";
import Homepage from './routes/Homepage.jsx';
import PostListPage from './routes/PostListPage.jsx'
import Write from './routes/Write.jsx'
import LoginPage from './routes/LoginPage.jsx'
import RegisterPage from './routes/RegisterPage.jsx';
import SinglePostPage from './routes/SinglePostPage.jsx';
import RootLayout from './layouts/RootLayout.jsx';
import { ClerkProvider, GoogleOneTap } from '@clerk/clerk-react';
import ErrorBoundary from './Components/ErrorBoundary.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  QueryClient,
  QueryClientProvider} from '@tanstack/react-query'
import About from './routes/About.jsx';
import NotFound from './routes/NotFound.jsx';

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const queryclient = new QueryClient()

const router = createBrowserRouter([
{
  path:'/',
  element:<RootLayout/>,
  errorElement:<ErrorBoundary/>,
  children:[
    {
      index:true,
      element:<Homepage/>,
    },
    {
      path:'/posts',
      element:<PostListPage/>
    },
    {
      path:'/:slug',
      element:<SinglePostPage/>
    },
    {
      path:'/write',
      element:<Write/>
    },
    {
      path:'/login',
      element:<LoginPage/>
    },
    {
      path:'/register',
      element:<RegisterPage/>
    },
    {
      path:'/about',
      element:<About/>
    },
    {
      path:'*',
      element:<NotFound/>
    },
    {
      path:'/404',
      element:<NotFound/>
    },
    
  ]
}

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ClerkProvider 
    options={{GoogleOneTap:true}}
    publishableKey={PUBLISHABLE_KEY}>
      <QueryClientProvider client={queryclient}>
    <RouterProvider router={router} />
    <ToastContainer position="bottom-right"/>
      </QueryClientProvider>
    </ClerkProvider>
  </StrictMode>,
)
