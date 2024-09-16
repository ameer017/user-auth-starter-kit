import React from 'react'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    return (
        <footer className=' py-4 flex items-center justify-center'>

            <div className='w-3/4  flex justify-between p-2 '>
                <p className='text-center  w-full border-t-2 ' >
                    Copyright &copy; {currentYear}, All rights reserved.
                </p>
            </div>
        </footer>
    )
}

export default Footer