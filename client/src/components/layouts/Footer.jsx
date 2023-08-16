import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='bg-black text-white p-3 footer'>
      <h4 className='text-center'> &copy; the.harshaa </h4>
      <p className='text-center mt-3'>
        <Link to='/about'>About</Link>
        |
        <Link to='/contact'>Contact US</Link>
        |
        <Link to='/policy'>Privacy Policy</Link>
      </p>
    </div>
  )
}
