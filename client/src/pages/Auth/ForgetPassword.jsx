import React, {useState} from 'react'
import Layout from '../../components/layouts/Layout'
import toast from 'react-hot-toast';
import axios from "axios"
import {useNavigate} from 'react-router-dom'
import '../../../src/form.css'
export default function ForgetPassword() {
    const [email,setEmail]= useState('');
    const [newPassword,setNewPassword]= useState('');
    const [answer,setAnswer]= useState('');
    const navigate = useNavigate();

    const handleChange = async (e) => {
        e.preventDefault()
        try {
            const res = await axios.post(`/api/v1/auth/forget-password`,{email,newPassword,answer})
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
    <Layout title={"'Forget Password - E-Commerce App'"}>
      <div className='form-container'>
        <form onSubmit={handleChange}>
        <h2 className='title text-4xl p-1'>Forget Password</h2>
  <div className="mb-2">
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputEmail"  required />
  </div>
  <div className="mb-2">
    <input type="text" value={answer} onChange={(e)=> setAnswer(e.target.value)} placeholder='Enter Your Nickname..' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputEmail"  required />
  </div>
  <div className="mb-2">
    <input type="password" value={newPassword} onChange={(e)=> setNewPassword(e.target.value)} placeholder='Enter Your New Password' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputPassword" required />
  </div>
  <div className='mb-2'>
    <button type="submit" className="inline-block align-middle text-center w-fit select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline text-white">Reset</button>
  </div>

</form>
      </div> 

    </Layout>
  )
}
