import React from 'react'
import Layout from '../../components/layouts/Layout'
import UserMenu from '../../components/layouts/UserMenu'
import { useAuth } from '../../context/auth'



export default function Dashboard() {
  const [auth] =useAuth()
  return (
    <Layout title={'Dashboard - E-Commerce App'}>
      <div className='container-fluid m-3 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <UserMenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h1 className='text-2xl'>User Name : {auth?.user?.name}</h1>
              <h1 className='text-2xl'>User E-mail : {auth?.user?.email}</h1>
              <h1 className='text-2xl'>User Phone : {auth?.user?.phone}</h1>
              <h1 className='text-2xl'>User Address : {auth?.user?.address}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
