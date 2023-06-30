import React from 'react'
import Layout from '../components/layouts/Layout'
import { Link } from 'react-router-dom'
export default function PageNotFound() {
  return (
    <Layout title={'404 ERROR - E-Commerce App'}>
      <div className='NotFound flex'>
      <img src="https://cdn.rawgit.com/ahmedhosna95/upload/1731955f/sad404.svg" alt='404' width="200px"/>

        <h1 className='NotFound-title'>404</h1>
        <h2 className='NotFound-heading'> Oops ! Page Not Found</h2>
        <Link to='/' className='NotFound-btn hover:no-underline'>
          Go Back
        </Link>
      </div>

    </Layout>
  )
}
