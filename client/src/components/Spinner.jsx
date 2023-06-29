import React,{useState,useEffect} from 'react'
import { Rings } from 'react-loader-spinner'
import Layout from './layouts/Layout'
import { useNavigate,useLocation } from 'react-router-dom'
export default function Spinner({path = "login"}) {
    const [count, setCount] = useState(3)
    const navigate = useNavigate()
    const location = useLocation()

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((preValue) => --preValue )
        },1000)
        count ===0 && navigate(`/${path}`,{
            state: location.pathname
        })
        return () => clearInterval(interval)
    }, [count,navigate,location,path])
  return (
    <Layout>
    <Rings
  height="80"
  width="80"
  color="black"
  radius="6"
  wrapperStyle={{
    display:"flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "70vh"
  }}
  wrapperClass=""
  visible={true}
  ariaLabel="rings-loading"
/>
</Layout>
  )
}
