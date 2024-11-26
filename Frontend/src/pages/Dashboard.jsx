import React from 'react'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const Dashboard = () => {
  return (
    <div>
      <Navbar />
      <h1 className='text-gray-900'>You Are logged In!!</h1>
      <Footer />
    </div>
  )
}

export default Dashboard
