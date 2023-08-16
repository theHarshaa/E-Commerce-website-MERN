import React from 'react'
import Layout from '../components/layouts/Layout'
import { useSearch } from '../context/search'
import { useNavigate } from 'react-router-dom'
import toast from "react-hot-toast"
import "../styles/Search.css";
import {useCart} from '../context/cart'

export default function Search() {
  const navigate = useNavigate()
  // eslint-disable-next-line
    const [values,setValues] = useSearch()
    const [cart,setCart] = useCart()
  return (
    <Layout title={'Search Results'}>
      <div className='container w-auto search'>
        <div className='text-center mt-3'>
            <h1 className='text-4xl'>Search Results</h1>
            <h6 className='text-xl'>{values?.results.length < 1 ? 'No Product Found' : `Found(${values?.results.length})`}</h6>
            <div className='d-flex flex-wrap mt-4 justify-center'>
            {values?.results.map((p) => (
              <div className="card m-2" style={{width: '18rem'}}>
                <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                <div className="card-name-price">
                <h5 className="card-title">{p.name}</h5>
                <h5 className="card-price">
                {p.price.toLocaleString("en-US", {
                        style: "currency",
                        currency: "USD",
                      })}
                </h5>
                </div>
                <p className="card-text">{p.description.substring(0,60)}</p>
                <div className="card-name-price">
                <button className='btn btn-info ms-2' onClick={() => navigate(`/product/${p.slug}`) }>See details</button>
                <button className='btn btn-secondary ms-2' 
                onClick={() => {
                  setCart([...cart,p])
                  localStorage.setItem("cart", JSON.stringify([...cart, p]))
                  toast.success("Added to Cart")
                  }}>Add to Cart</button>
                </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  )
}
