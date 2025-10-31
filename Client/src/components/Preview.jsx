import React from 'react'
// import Contact from './Contact'

const Preview = () => {
  return (
    <>
      <div className="flex justify-center items-center relative top-0">
        <div className="relative bg-yellow-500 w-1/3">
          <img src="/src/images/i1.jpg" className="h-screen w-full opacity-50" />
          <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl text-white">Property Listing</h1>
        </div>

        <div className="relative bg-red-500 w-1/3">
          <img src="/src/images/i2.jpg" className="h-screen w-full opacity-50" />
          <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl text-white">Tenant Management</h1>
        </div>

        <div className="relative bg-green-300 w-1/3">
          <img src="/src/images/i3.webp" className="h-screen w-full opacity-50" />
          <h1 className="absolute top-10 left-1/2 transform -translate-x-1/2 text-2xl text-white">Rental Agreements</h1>
        </div>
      </div>

      {/* <div className="absolute top-0">
        <Contact/>
      </div> */}

      
      
    </>
  )
}

export default Preview;
