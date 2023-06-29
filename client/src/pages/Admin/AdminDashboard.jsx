import React from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import { useAuth } from '../../context/auth'

export default function AdminDashboard() {
  const [auth] =useAuth()
  return (
    <Layout title={'Dashboard - E-Commerce App'}>
      <div className='container-fluid m-3 p-4'>
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <div className='card w-75 p-3'>
              <h1 className='text-2xl'>Admin Name : {auth?.user?.name}</h1>
              <h1 className='text-2xl'>Admin E-mail : {auth?.user?.email}</h1>
              <h1 className='text-2xl'>Admin Phone : {auth?.user?.phone}</h1>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  )
}
