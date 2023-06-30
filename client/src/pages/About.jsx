import React from 'react'
import Layout from './../components/layouts/Layout'
export default function About() {
  return (
    <Layout title={'About Us - E-Commerce App'} >
    <div className="flex flex-wrap  contactus ">
      <div className="md:w-1/2 pr-4 pl-4 ">
        <img
          src="/images/about.jpeg"
          alt="contactus"
          style={{ width: "100%" }}
        />
      </div>
      <div className="md:w-1/3 pr-4 pl-4">
        <p className="text-justify mt-2">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
          officiis obcaecati esse tempore unde ratione, eveniet mollitia,
          perferendis eius temporibus dicta blanditiis doloremque explicabo
          quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
          accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
          commodi illum quidem neque tempora nam.
        </p>
      </div>
    </div>
  </Layout>
  )
}
