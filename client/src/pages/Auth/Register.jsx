import React, {useState} from 'react'
import Layout from '../../components/layouts/Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import '../../../src/form.css'

export default function Register() {
    const [name,setName]= useState('');
    const [email,setEmail]= useState('');
    const [password,setPassword]= useState('');
    const [phone,setPhone]= useState('');
    const [address,setAddress]= useState('');
    const [answer,setAnswer]= useState('');
    const navigate = useNavigate();

    //form validation
    const handleChange = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/api/v1/auth/register`,{name,email,password,phone,address,answer})
            if(res.data && res.data.success){
                toast.success(res.data && res.data.success)
                navigate('/login')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error);
            toast.error('Something Went Wrong')
        }
    }

  return (
    <Layout title={'Register - E-Commerce App'}>
      <div className='form-container'>
        <form onSubmit={handleChange}>
        <h2 className='title text-4xl p-1'>Register</h2>
  <div className="mb-2">
    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Your Name' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputName"  required />
  </div>
  <div className="mb-2">
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputEmail"  required />
  </div>
  <div className="mb-2">
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Your Password' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputPassword" required />
  </div>
  <div className="mb-2">
    <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder='Enter Your Phone No.' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputPhone"  required />
  </div>
  <div className="mb-2">
    <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Enter Your Address' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputAddress"  required />
  </div>
  <div className="mb-2">
    <input type="text" value={answer} onChange={(e)=> setAnswer(e.target.value)} placeholder='What is your Nickname..?' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputAddress"  required />
  </div>
  <button type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600">Register</button>
</form>
      </div> 
    </Layout>
  )
}
