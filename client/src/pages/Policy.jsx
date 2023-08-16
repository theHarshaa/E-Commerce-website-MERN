import React from 'react'
import Layout from '../components/layouts/Layout'
export default function Policy() {
  return (
    <Layout title={'Privacy Policy - E-Commerce App'}>
      <div className="flex flex-wrap  contactus ">
        <div className="md:w-1/2 pr-4 pl-4 ">
          <img
            src="/images/privacy.jpg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="md:w-1/3 pr-4 pl-4">
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
            <p>add privacy policy</p>
        </div>
      </div>
    </Layout>
  )
}
