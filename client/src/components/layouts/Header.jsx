import React from 'react'
import {NavLink,Link} from 'react-router-dom'
import { useState } from "react";
import { useAuth } from '../../context/auth';
import  toast  from 'react-hot-toast';
import SearchInput from '../form/SearchInput';
import useCategory from '../../hooks/useCategory';
import { useCart } from '../../context/cart';
import {Badge} from 'antd'

export default function Header() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [auth, setAuth] = useAuth();
  const [cart] = useCart()
  const categories = useCategory()

  const handleLogout = () => {
    setAuth({
      ...auth,
      user:null,
      token:'',
    })
    localStorage.removeItem('auth')
    toast.success("Log Out Successfully")
  }
  return (
    <>
<div className="items-baseline shadow-lg shadow-white-100/50 py-0 px-4 navbar">
      <Link className="title text-4xl hover:no-underline brand flex items-center" to='/'>
      E•com🛒
      </Link>
      <nav>
        <section className="m-3 MOBILE-MENU flex lg:hidden">
          <div
            className="HAMBURGER-ICON space-y-2"
            onClick={() => setIsNavOpen((prev) => !prev)} // toggle isNavOpen state on click
          >
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
            <span className="block h-0.5 w-8 animate-pulse bg-gray-600"></span>
          </div>

          <div className={isNavOpen ? "showMenuNav" : "hideMenuNav"}> 
            <div
              className="CROSS-ICON absolute top-0 right-0 p-8"
              onClick={() => setIsNavOpen(false)} // change isNavOpen state to false to close the menu
            >
              <svg
                className="h-8 w-8 text-gray-600"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </div>
            <ul className="MENU-LINK-MOBILE-OPEN flex flex-col items-center justify-evenly min-h-[250px]">
            <SearchInput />
              <li className="text-base px-1 py-2 text-slate-700 rounded-lg hover:font-bold my-4 uppercase">
                <NavLink to="/" className="text-3xl hover:no-underline">Home</NavLink>
              </li>
              <li className="text-base px-1 py-2 text-slate-700 rounded-lg hover:font-bold my-4 uppercase">
                <NavLink to="/categories" className="text-3xl hover:no-underline">Category</NavLink>
              </li>
              
              {
            !auth.user ? (
            <>
            <li className="text-base p-1 text-slate-700 rounded-lg hover:font-bold my-4 uppercase">
            <NavLink to="/register" className="text-3xl hover:no-underline">Register</NavLink>
          </li>
          <li className="text-base p-1 text-slate-700 rounded-lg hover:font-bold my-4 uppercase">
            <NavLink to="/login" className="text-3xl hover:no-underline">Login</NavLink>
          </li>
            </>) : (
              <li  className="text-base p-1 text-tahiti text-slate-700 rounded-lg  my-4 uppercase">
              <div className="dropdown">
                <button className="btn text-tahiti text-3xl dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                {auth?.user?.name}
                </button>
                <ul className="dropdown-menu">
                <li>
                  <NavLink  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user" }`} className="text-3xl hover:no-underline text-base p-1 text-slate-700 rounded-lg hover:font-bold my-4 uppercase" role="menuitem" tabIndex={-1} id="menu-item-0">Dashboard</NavLink>
                </li>
                <li><hr className="dropdown-divider" /></li>
                <li>
                  <NavLink onClick={handleLogout} to="/login" className="text-3xl hover:no-underline text-base p-1 text-slate-700 rounded-lg hover:font-bold my-4 uppercase" role="menuitem" tabIndex={-1} id="menu-item-1">Logout</NavLink>
                </li>
                </ul>
              </div>
              </li>
            )
           }   
              <li className="text-base p-1 text-slate-700 rounded-lg hover:font-bold my-4 uppercase">
                <Badge count={cart?.length}>
                  <NavLink to="/cart" className="text-3xl hover:no-underline">Cart</NavLink>
                </Badge>
              </li>
            </ul>
          </div>
        </section>
        <ul className="DESKTOP-MENU items-baseline hidden space-x-8 lg:flex">
        <SearchInput />
          <li className="text-base p-1 text-slate-700 rounded-lg hover:font-bold my-3  uppercase">
            <NavLink to="/" className="hover:no-underline text-lg">Home</NavLink>
          </li>
          <li className="nav-item dropdown text-base p-1 text-slate-700 rounded-lg hover:font-bold  my-3  uppercase">
      <NavLink className="text-lg hover:no-underline nav-link dropdown-toggle" data-bs-toggle="dropdown" >
          Category
       </NavLink>
  <ul className="dropdown-menu">
    <li><Link className="dropdown-item" to={"/categories"}>All Categories</Link></li>
    <li><hr className="dropdown-divider" /></li>
 {categories?.map((c) => (
  <li><Link className="dropdown-item" to={`/category/${c.slug}`}>{c.name}</Link></li>
))}
  </ul>
</li>
           {
            !auth.user ? (
            <>
            <li className="text-base p-1 text-slate-700 rounded-lg hover:font-bold my-3  uppercase">
            <NavLink to="/register" className="hover:no-underline text-lg">Register</NavLink>
          </li>
          <li className="text-base p-1 text-slate-700 rounded-lg hover:font-bold my-3  uppercase">
            <NavLink to="/login" className="hover:no-underline text-lg">Login</NavLink>
          </li>
            </>) : (
              <li  className="text-base p-1 text-tahiti text-slate-700 rounded-lg hover:font-bold my-3 uppercase">
              <div className="dropdown">
  <NavLink className="btn uppercase text-tahiti dropdown-toggle text-lg hover:font-bold" type="button" data-bs-toggle="dropdown" aria-expanded="false">
  {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu">
  <li>
    <NavLink  to={`/dashboard/${auth?.user?.role === 1 ? "admin" : "user" }`} className="hover:no-underline text-lg p-1 text-slate-700 rounded-lg hover:font-bold my-3  uppercase" role="menuitem" tabIndex={-1} id="menu-item-0">Dashboard</NavLink>
    </li>
    <li><hr className="dropdown-divider" /></li>
    <li>
  <NavLink onClick={handleLogout} to="/login" className="hover:no-underline text-lg p-1 text-slate-700 rounded-lg hover:font-bold my-3  uppercase" role="menuitem" tabIndex={-1} id="menu-item-1">Logout</NavLink>
  </li>
  </ul>
</div>
              </li>
              
            )
           }   
          <li className="text-base p-1 text-slate-700 rounded-lg hover:font-bold my-3 uppercase">
            <Badge count={cart?.length}>
            <NavLink to="/cart" className="text-lg hover:no-underline">Cart</NavLink>
            </Badge>
          </li>
        </ul>
      </nav>
      <style>{`
      @import url('https://fonts.googleapis.com/css2?family=Bruno+Ace&display=swap');
      .hideMenuNav {
        display: none;
      }
      .showMenuNav {
        display: block;
        position: absolute;
        width: 100%;
        height: 100vh;
        top: 0;
        left: 0;
        background: white;
        z-index: 10;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
      }
      .title{
        font-family: 'Bruno Ace', cursive;
      }
    `}</style>
    </div>


    </>
  )
}
