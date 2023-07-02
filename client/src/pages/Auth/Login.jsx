import React, {useState} from 'react'
import Layout from '../../components/layouts/Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate,useLocation} from 'react-router-dom'
import '../../../src/form.css'
import { useAuth } from '../../context/auth';

export default function Login() {
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const navigate = useNavigate();
    const [auth,setAuth ]= useAuth();
    const location = useLocation();

    const handleChange = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`,{email,password})
            if(res.data && res.data.success){
                toast.success(res.data && res.data.success)
                setAuth({
                  ...auth,
                  user: res.data.user,
                  token: res.data.token
                })
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate( location.state || '/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
        }
    }
  return (
    <Layout title={'Login - E-Commerce App'}>
      <div className='form-container'>
        <form onSubmit={handleChange}>
        <h2 className='title text-4xl p-1'>Login</h2>
  <div className="mb-2">
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputEmail"  required />
  </div>
  <div className="mb-2">
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Your Password' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputPassword" required />
  </div>
  <div className='mb-2'>
    <button type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white">Login</button>
  </div>
    <div className='mb-2'>
    <button type="button" onClick={() => {navigate("/forget-password")}} className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white forget">Forget Password</button>
    </div>

</form>
      </div> 
    </Layout>
  )
}
