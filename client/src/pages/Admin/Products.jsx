import React,{useEffect,useState} from 'react'
import AdminMenu from '../../components/layouts/AdminMenu'
import Layout from '../../components/layouts/Layout'
import toast  from 'react-hot-toast'
import axios from 'axios'
import { Link } from 'react-router-dom'

export default function Product() {
  const [products, setProducts] =useState([])

  //get all products
  const getAllProducts = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product`)
      setProducts(data.products)
    } catch (error) {
      console.log(error);
      toast.error("Something went Wrong")
    }
  }

  //lifecycle method
  useEffect(() => {
    getAllProducts()
  }, []);
  return (
    <Layout title={"Dashboard - All Products"}>
    <div className="container-fluid m-3 p-4">
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu />
        </div>
        <div className='col-md-9'>
            <h1 className='text-3xl text-center mb-2 mt-3'>List of All Products</h1>
            <div className='d-flex gap-x-15 flex-wrap'>
            {products?.map(p => (
              <Link className='hover:no-underline product-link' key={p._id} to={`/dashboard/admin/product/${p.slug}`}>
              <div className="card m-2" style={{width: '18rem'}}>
                <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`} className="card-img-top" alt={p.name} />
                <div className="card-body">
                <h5 className="card-title">{p.name}</h5>
                <p className="card-text">{p.description}</p>
                </div>
              </div>
              </Link>
            ))}
              </div>
        </div>
      </div>
    </div>
    </Layout>
  )
}
