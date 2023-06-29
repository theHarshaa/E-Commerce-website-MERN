import React,{ useEffect, useState } from 'react'
import Layout from '../components/layouts/Layout'
import { useParams,useNavigate } from 'react-router-dom'
import axios from 'axios'
import  toast  from 'react-hot-toast';
import { useCart } from '../context/cart';
import "../styles/CategoryProductStyles.css";
export default function CategoryProduct() {
  const [products,setProduct] = useState([])
  const [category,setCategory] = useState([])
  const [cart,setCart] = useCart()
  const params = useParams()
  const navigate = useNavigate()

  const getProductByCat = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)
      setProduct(data?.products)
      setCategory(data?.category)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if(params?.slug) getProductByCat()
    // eslint-disable-next-line
  },[params?.slug])
  return (
    <Layout>
      <div className='container mt-3 category'>
        <h1 className='text-3xl text-center title'>Category - {category?.name}</h1>
        <p className=' text-center'>({products?.length}) results found</p>
        <div className='row'>
        <div className="col-md-9 offset-1">
        <div className='d-flex gap-x-18 flex-wrap'> 
          {products?.map(p => (
              <div className="card m-2" key={p._id} style={{width: '18rem'}}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
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
                <p className="card-text">{p.description.substring(0,30)}</p>
                <div className="card-name-price">
                <button className='btn btn-info ms-2' onClick={() => navigate(`/product/${p.slug}`) }>See details</button>
                <button className='btn btn-secondary ms-2' onClick={() => {
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
      </div>
    </Layout>
  )
}
