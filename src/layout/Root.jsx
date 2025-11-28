import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router'
import { ToastContainer } from 'react-toastify'

const Root = () => {
  return (
    <div>
        <Navbar></Navbar>
        <Outlet/>
        <ToastContainer />
    </div>
  )
}

export default Root