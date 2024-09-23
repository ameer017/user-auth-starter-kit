import React from 'react'

const Home = () => {
  return (
    <div className='flex justify-center items-center min-h-[85vh]'>
      <div className='w-3/4 p-4 flex items-center justify-between md:flex-row flex-col '>
        <div>
          <h1 className='text-2xl font-bold mb-4 text-center md:text-left'>
            Secure, Scalable Authentication Made Easy
          </h1>
          <p className='mb-2'>
            Simplify user management with our powerful authentication starter kit. Build seamless login, registration, and password recovery flows in minutes — fully customizable and secure.
          </p>
          <p className='mb-4'>
            Get started today and take control of your app&apos;s authentication.
          </p>
          <button className='px-4 py-2 bg-blue-600 text-white rounded hover:-translate-y-2 transition-transform duration-300'>
            Get Started
          </button>
        </div>

        <div>
          <img src='https://cdn.dribbble.com/users/279014/screenshots/5722905/dribbble_1.gif' alt='hero-image' />
        </div>
      </div>
    </div>
  )
}

export default Home
