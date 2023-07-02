import React,{useState,useEffect} from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth';
import axios from 'axios';
import toast from "react-hot-toast"

export default function Profile() {
  const [auth, setAuth] = useAuth()
  const [name,setName]= useState('');
  const [email,setEmail]= useState('');
  const [password,setPassword]= useState('');
  const [phone,setPhone]= useState('');
  const [address,setAddress]= useState('');

  //form validation
  const handleChange = async (e) => {
    e.preventDefault()
    try {
        const {data} = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/profile`,{name,email,password,phone,address})
        if(data?.data){
          toast.error(data?.error)
        }else{
          setAuth({...auth, user:data?.updatedUser})
          let ls = localStorage.getItem("auth")
          ls = JSON.parse(ls)
          ls.user = data.updatedUser
          localStorage.setItem('auth', JSON.stringify(ls))
          toast.success("Profile Updated Successfully")
        }
    } catch (error) {
        console.log(error);
        toast.error('Something Went Wrong')
    }
}

    //get user data
    useEffect(() => {
      const {name,email,phone,address} = auth?.user
      setName(name)
      setEmail(email)
      setPhone(phone)
      setAddress(address)
    }, [auth?.user])
  
  return (
    <Layout title={"Your Profile"}>
      <div className='container-fluid m-3 p-4'>
        <div className='row'>
          <div className='col-md-2 flex justify-center'>
            <UserMenu />
          </div>
          <div className='col-md-10'>
          <div className='form-container justify-center'>
        <form onSubmit={handleChange}>
        <h2 className='title text-4xl p-1'>User Profile</h2>
  <div className="mb-2">
    <input type="text" value={name} onChange={(e)=> setName(e.target.value)} placeholder='Enter Your Name' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputName" autoFocus />
  </div>
  <div className="mb-2">
    <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)} placeholder='Enter Your Email' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputEmail" disabled />
  </div>
  <div className="mb-2">
    <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)} placeholder='Enter Your Password' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputPassword" />
  </div>
  <div className="mb-2">
    <input type="text" value={phone} onChange={(e)=> setPhone(e.target.value)} placeholder='Enter Your Phone No.' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputPhone"  />
  </div>
  <div className="mb-2">
    <input type="text" value={address} onChange={(e)=> setAddress(e.target.value)} placeholder='Enter Your Address' className="block appearance-none w-full py-1 px-2 mb-1 text-base leading-normal bg-white text-gray-800 rounded" id="InputAddress"  />
  </div>
  <button type="submit" className="inline-block align-middle text-center select-none border font-normal whitespace-no-wrap rounded py-1 px-3 leading-normal no-underline bg-blue-600 text-white hover:bg-blue-600">Update</button>
</form>
      </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}
