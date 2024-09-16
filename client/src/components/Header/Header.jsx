import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className=' py-4 flex items-center justify-center sticky'>
            <nav className='w-3/4 border-2 flex justify-between p-2'>
                <Link to="/" className='text-2xl cursor-pointer'>
                    Auth
                </Link>
                <div className='flex items-center justify-center gap-3'>
                    <Link to="#">
                        Posts
                    </Link>

                    <Link to="/">
                        <img className='w-[60px] h-[60px] rounded-lg ' alt='profile image' />
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header