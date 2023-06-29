import React from 'react'
import { NavLink } from 'react-router-dom'

export default function AdminMenu() {
  return (
    <>
    <div className='text-center'>
      <h2 className='text-xl'>Admin Panel</h2>
     <ul className="list-group">
         <li className="list-group-item ">
          <NavLink to="/dashboard/admin/create-categories" className="hover:no-underline">Create Categories</NavLink>    
         </li>
         <li className="list-group-item">
          <NavLink to="/dashboard/admin/create-product" className="hover:no-underline">Create Product</NavLink>    
         </li>
         <li className="list-group-item">
          <NavLink to="/dashboard/admin/products" className="hover:no-underline">All Products</NavLink>    
         </li>
         <li className="list-group-item">
          <NavLink to='/dashboard/admin/orders' className="hover:no-underline">Orders</NavLink>
         </li>
      </ul>
     </div>
    </>
  )
}
