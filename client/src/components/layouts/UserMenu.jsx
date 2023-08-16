import React from 'react'
import { NavLink } from 'react-router-dom'

export default function UserMenu() {
  return (
    <>
    <div className='text-center'>
      <h2 className='text-xl'>Dashboard</h2>
     <ul className="list-group">
         <li className="list-group-item ">
          <NavLink to="/dashboard/user/profile" className="hover:no-underline">Profile</NavLink>    
         </li>
         <li className="list-group-item">
          <NavLink to="/dashboard/user/orders" className="hover:no-underline">My Orders</NavLink>    
         </li>
      </ul>
     </div>
    </>
  )
}
