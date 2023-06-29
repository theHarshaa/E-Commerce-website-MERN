import React,{useEffect,useState} from 'react'
import Layout from './../components/layouts/Layout'
import axios from 'axios'
import {Checkbox,Radio} from "antd"
import { Prices } from '../components/Price'
import { useNavigate } from 'react-router-dom'
import {useCart} from '../context/cart'
import toast from "react-hot-toast"
import "../styles/Homepage.css";

export default function HomePage() {
  const navigate = useNavigate()
  const [cart,setCart] = useCart()
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [checked, setChecked] = useState([])
  const [radio, setRadio] = useState([])
  const [total, setTotal] = useState(0)
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  //get all products
  const getAllProducts = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts(data.products)
    } catch (error) {
      setLoading(false)
      console.log(error);
    }
  }

  //lifecycle method
  useEffect(() => {
    getAllProducts()
    getTotal()
    // eslint-disable-next-line
  }, []);

  //get all Category
  const getAllCategory = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`)
      if(data?.success){
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
    }
  }

  //get total count
  const getTotal = async () => {
    try {
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
      setTotal(data?.total)
    } catch (error) {
      console.log(error);
    }
  }


  useEffect(() => {
    if(page === 1) return
    loadMore()
    // eslint-disable-next-line
  }, [page])
  //load more
  const loadMore = async () => {
    try {
      setLoading(true)
      const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
      setLoading(false)
      setProducts([...products, ...data?.products])
    } catch (error) {
      console.log(error);
      setLoading(false)
    }
  }

  //filter
  const handleFilter = async (value, id) => {
    let all = [...checked]
    if(value){
      all.push(id)
    }else{
      all = all.filter(c => c!==id)
    }
    setChecked(all)
  }

  useEffect(() => {
   if(!checked.length || !radio.length) getAllCategory()
  },[checked.length,radio.length])

  useEffect(() => {
    if(checked.length || radio.length) filterProduct()
    // eslint-disable-next-line
  }, [checked,radio])

  //get filtered product
  const filterProduct = async () => {
    try {
      const {data} = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filter`,{checked,radio})
      setProducts(data?.products)
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Layout title={'Shop Now - E-Commerce App'}>
      <div className="container-fluid row mt-3 home-page">
        <div className="col-md-3 filters">
          <h4 className='text-2xl text-center'>Filter by Category</h4>
          <div className='d-flex flex-column'>
          {categories?.map(c => (
            <Checkbox key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
              {c.name}
            </Checkbox>
          ))}
          </div>
          <h4 className='text-2xl text-center mt-4'>Filter by Price</h4>
          <div className='d-flex flex-column'>
              <Radio.Group  onChange={(e) => setRadio(e.target.value) }>
                {Prices?.map(p => (
                  <div key={p._id}>
                  <Radio value={p.array}>{p.name}</Radio>
                  </div>
                ))}
              </Radio.Group>
          </div>
          <div className='m-3'>
            <button className='btn btn-warning' onClick={() => window.location.reload()}>Reset Filters</button>
          </div>
        </div>
        <div className='col-md-9 '>
          <h1 className='text-3xl text-center'>All Products</h1>
          <div className='d-flex gap-x-18 flex-wrap'>
          {products?.map(p => (
              <div className="card m-2" style={{width: '18rem'}}>
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
        <div className='m-2 p-3'>
        {products && products.length < total &&(
          <button className='btn btn-secondary loadmore' onClick={(e) => {e.preventDefault(); setPage(page +1)}}>
            {loading ? "Loading ...." : "Load More"}
          </button>
        )}
        </div>
        </div>
      </div>
    </Layout>
  )
}
