import React from 'react'
import Layout from '../components/layouts/Layout'
import useCategory from '../hooks/useCategory'
import { Link } from 'react-router-dom'

export default function Categorise() {
    const categories = useCategory()
  return (
    <Layout title={"All Categories"}>
      <div className='container'>
        <div className='row'>
        {categories.map((c) => (
            <div className='card col-md-3 flex text-center justify-center mt-5 p-2 mb-3 gx-3 gy-3' key={c._id}>
            <div className="card-body">
            <Link className='btn card-header  btn-outline-info cat-btn' to={`/category/${c.slug}`}>{c.name}</Link>
            </div>
            </div>
        ))}
        </div>
      </div>
    </Layout>
  )
}
