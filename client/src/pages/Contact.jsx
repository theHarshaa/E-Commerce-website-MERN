import React from 'react'
import Layout from './../components/layouts/Layout'
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";

export default function Contact() {
  return (
    <Layout title={'Contact Us - E-Commerce App'}>
      <div className="flex flex-wrap  contactus ">
        <div className="md:w-1/2 pr-4 pl-4 ">
          <img
            src="/images/contact.jpeg"
            alt="contactus"
            style={{ width: "100%" }}
          />
        </div>
        <div className="md:w-1/3 pr-4 pl-4">
          <h1 className="bg-gray-900 p-2 text-white text-center">CONTACT US</h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            vaialible
          </p>
          <p className="mt-3 flex items-center">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3 flex items-center">
            <BiPhoneCall /> : 012-3456789
          </p>
          <p className="mt-3 flex items-center">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  )
}
