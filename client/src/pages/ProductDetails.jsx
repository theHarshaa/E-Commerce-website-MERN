import React,{useEffect,useState} from 'react'
import Layout from '../components/layouts/Layout'
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import "../styles/ProductDetailsStyles.css";
import  toast  from 'react-hot-toast';
import { useCart } from '../context/cart';

export default function ProductDetails() {
    const navigate = useNavigate()
    const [cart,setCart] = useCart()
    const params = useParams()
    const [product, setProduct] = useState({})
    const [relatedProducts,setRelatedProducts] = useState([])
    
    useEffect(() => {
        if(params?.slug) getProduct()
        // eslint-disable-next-line
    }, [params?.slug])
    
    //get Product
    const getProduct = async() => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`)
            setProduct(data?.product)
            getSimilarProduct(data?.product._id,data?.product.category._id)
        } catch (error) {
            console.log(error);
        }   
    }

    //get similar product
    const getSimilarProduct =  async (pid,cid) => {
        try {
            const {data} = await axios.get(`${process.env.REACT_APP_API}/api/v1/product//related-product/${pid}/${cid}`)
            setRelatedProducts(data?.products)
        } catch (error) {
            console.log(error);
        }
    }
  return (
    <Layout>
      <div className='container row product-details'>
        <div className='col-md-4 m-0'>
            <img src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`} className="card-img-top w-fit h-max w-3/6" alt={product.name} />
        </div>
        <div className='col-md-7 product-details-info'>
            <h1 className='text-3xl text-center'>Product details</h1>
            <hr />
            <h6>Name : {product.name}</h6>
            <h6>Description : {product.description}</h6>
            <h6>Price : {product?.price?.toLocaleString("en-US", {
              style: "currency",
              currency: "USD",
            })}</h6>
            <h6>Category : {product?.category?.name}</h6>
            <button className='btn btn-secondary ms-2' onClick={() => {
                  setCart([...cart,product])
                  localStorage.setItem("cart", JSON.stringify([...cart, product]))
                  toast.success("Added to Cart")
                  }}>Add to Cart</button>
        </div>
      </div>
      <hr/>
      <div className='row container'>
      <h4 className='text-3xl m-4'>Similar Products ⤵️</h4>
      {relatedProducts.length < 1 && (
        <h1 className='text-center mt-9'>No Similar Product found</h1>
      )}
      </div>
      <div className='d-flex gap-x-18 flex-wrap similar-products'>
          {relatedProducts?.map(p => (
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
    </Layout>
  )
}
