import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'
const Navbar = () => {
  return (
    <div className='navbar'>

      <img src={assets.logo} alt="" className='logo' />

      <div className='admin-info'>
        <span className='admin-name'>Admin</span>
        <img src={assets.profile_image} alt="" className='profile' />
      </div>
    </div>
  )
}

export default Navbar
