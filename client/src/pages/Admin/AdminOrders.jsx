import React,{useEffect,useState} from 'react'
import axios from 'axios'
// import toast from 'react-hot-toast'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
const { Option } = Select;
export default function AdminOrders() {
  // eslint-disable-next-line
    const [status,setStatus] = useState(["Not Process", "Processing", "Shipped", "Deliverd", "Cancel"])
    const [orders,setOrders] = useState([])
  // eslint-disable-next-line
  const [auth, setAuth] = useAuth()

  const getOrders = async() => {
    try {
      const {data} = await axios.get(`/api/v1/auth/all-orders`)
      setOrders(data)
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    if(auth?.token) getOrders()
  },[auth?.token])

  const handleChange = async(orderId,value) => {
    try {
      // eslint-disable-next-line
      const {data} =await axios.put(`/api/v1/auth/order-status/${orderId}`,{status:value})
      getOrders()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Layout title={'All Order Data'}>
    <div className='container-fluid m-3 p-4'>
    <div className='row'>
        <div className='col-md-2 flex justify-center'>
            <AdminMenu />
        </div>
        <div className='col-md-10'>
            <h1 className='text-center text-3xl'>All Order</h1>
            {
              orders?.map((o,i) => {
                return(
                  <div className='border shadow justify-center'>
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
                        <td>
                            <Select bordered={false} onChange={(value) => handleChange(o?._id,value)} defaultValue={o?.status}>
                                {status.map((s,i) => (
                                  <Option key={i} value={s}>{s}</Option>
                                ))}
                            </Select>
                        </td>
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
