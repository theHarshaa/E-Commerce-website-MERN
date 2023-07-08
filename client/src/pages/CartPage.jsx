import React,{useState,useEffect} from 'react'
import Layout from '../components/layouts/Layout'
import { useCart } from '../context/cart'
import { useAuth } from '../context/auth'
import { useNavigate } from 'react-router-dom'
import DropIn from "braintree-web-drop-in-react";
import axios from 'axios'
import  toast  from 'react-hot-toast'
import "../styles/CartStyles.css";

export default function CartPage() {
    const [cart,setCart] =useCart()
    // eslint-disable-next-line
    const [auth,setAuth] =useAuth()
    const navigate= useNavigate()
    const [clientToken, setClientToken] = useState('')
    const [instance, setInstance] = useState('')
    const [loading, setLoading] = useState(false)

    //total price
    const totalPrice = () => {
        try {
            let total = 0;
            // eslint-disable-next-line
            cart?.map((item) => {
                total = total + item.price;
        });
            return total.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
            })
        } catch (error) {
            console.log(error);
        }
    }

    //remove the product from cart
    const removeCartItem = async(pid) => {
        try {
            let myCart = [...cart]
            let index = myCart.findIndex(item => item._id === pid)
            myCart.splice(index, 1)
            setCart(myCart)
            localStorage.setItem("cart", JSON.stringify(myCart))
        } catch (error) {
            console.log(error);
        }
    }

    //get payment gateway token
    const getToken = async () => {
        try {
            const {data} = await axios.get(`/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getToken()
    },[auth?.token])

    //handle Payment
    const handlePayment = async () => {
        try {
            setLoading(true)
            const {nonce} = await instance.requestPaymentMethod();
            // eslint-disable-next-line
            const {data} = await axios.post(`/api/v1/product/braintree/payment`,{
                nonce,cart
            })
            setLoading(false)
            localStorage.removeItem('cart')
            setCart([])
            navigate('/dashboard/user/orders')
            toast.success("Payment Completed Successfully")
        } catch (error) {
            console.log(error);
            setLoading(false)
        }
    }
  return (
    <Layout>
      <div className='cart-page'>
        <div className='row'>
            <div className='col-md-12'>
                <h1 className='text-center title bg-light p-2 m-1 text-4xl'>
                {!auth?.user
                ? "Hello Guest"
                : `Hello  ${auth?.token && auth?.user?.name}`}
                </h1>
                <p className='text-center'>
                    {cart?.length ? `You have ${cart.length} item in your Cart ${auth?.token ? "" : "Please Login to Checkout"}` : "Your Cart is Empty"}
                </p>
            </div>
        </div>
        <div className="container ">
        <div className='row'>
            <div className='col-md-8 p-0 m-0'>
               {cart?.map(p => (
                <div className='row m-2 card p-3 flex-row' key={p._id}>
                    <div className='col-md-4'>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top w-75" 
                      alt={p.name}/>
                     </div>
                    <div className='col-md-4'>
                        <h1 className='text-2xl'>{p.name}</h1>
                        <p className='text-sm'>{p.description.substring(0,30)}</p>
                        <h4 className='text-base'>Price :
                {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })} </h4>
                    </div>
                        <div className="col-md-4 cart-remove-btn">
                            <button className='btn btn-danger' onClick={() => removeCartItem(p._id)}>Remove from cart</button>
                        </div>
                </div>
               ))}
            </div>
            <div className='col-md-4 text-center cart-summary'>
                <h2 className='text-2xl'>Cart Summery</h2>
                <p>total | Checkout | Payment</p>
                <hr />
                <h4 className='text-base'>Total :  {totalPrice()} </h4>
                {auth?.user?.address ? (
                    <>
                        <div className='mb-3'>
                            <h4>Current Address</h4>
                            <h5>{auth?.user?.address}</h5>
                            <button className='btn btn-outline-warning' 
                            onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                        </div>
                    </>
                ) : (
                    <div className='mb-3'>
                        {
                            auth?.token ? (
                                <button className='btn btn-outline-warning'
                                onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                            ) : (
                                <button className='btn btn-outline-warning'
                                onClick={() => navigate('/login',{state: "/cart"})}>Please Login to Checkout...!!!</button>
                            )}
                    </div>
                )}
                <div className='mt-1'>
                { !clientToken || !cart?.length ? ("") : (
                    <>
                    <DropIn 
                        options={{
                            authorization: clientToken,
                            paypal: {
                                flow: 'vault'
                            }
                        }}
                        onInstance={instance => setInstance(instance)}
                    />
                    <button className='btn btn-success' 
                    onClick={handlePayment}
                     disabled={loading || !instance || !auth?.user?.address}>
                     { loading ? "Processing...." : "Make Payment"}
                     </button>
                    </>
                )}
                </div>
            </div>
        </div>
        </div>
      </div>
    </Layout>
  )
}
