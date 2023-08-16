import React,{useState,useEffect} from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import axios from 'axios'
import moment from 'moment'
import { useAuth } from '../../context/auth'

export default function Orders() {
  const [orders,setOrders] = useState([])
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth()

  const getOrders = async() => {
    try {
      const {data} = await axios.get(`/api/v1/auth/orders`)
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(auth?.token) getOrders()
  },[auth?.token])
  return (
    <Layout title={"Your Orders"}>
      <div className='container-fluid m-3 p-4'>
        <div className='row'>
          <div className='col-md-2 flex justify-center'>
            <UserMenu />
          </div>
          <div className='col-md-10'>
            <h1 className='text-3xl text-center mb-2 mt-3'>All Order</h1>
            {
              orders?.map((o,i) => {
                return(
                  <div className='border shadow'>
                    <table className='table'>
                      <thead>
                        <tr>
                          <th scope='col'>#</th>
                          <th scope='col'>Status</th>
                          <th scope='col'>Buyer</th>
                          <th scope='col'>Time</th>
                          <th scope='col'>Payment</th>
                          <th scope='col'>Quantity</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                        <td>{i+1}</td>
                        <td>{o?.status}</td>
                        <td>{o?.buyer?.name}</td>
                        <td>{moment(o?.createdAt).fromNow()}</td>
                        <td>{o?.payment.success ? "Success" : "Failed"}</td>
                        <td>{o?.products?.length}</td>
                        </tr>
                      </tbody>
                    </table>
                    <div className='container'>
                    {o?.products?.map((p,i) => (
                     <div className='row m-2 card p-3 flex-row'>
                    <div className='col-md-3'>
                    <img src={`/api/v1/product/product-photo/${p._id}`} className="card-img-top w-75" alt={p.name}/>
                     </div>
                    <div className='col-md-9'>
                        <h1 className='text-2xl'>{p.name}</h1>
                        <p className='text-sm'>{p.description}</p>
                        <h4 className='text-base'>Price : {p.price.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })}</h4>
                        </div>
                </div>
               ))}
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </Layout>
  )
}
