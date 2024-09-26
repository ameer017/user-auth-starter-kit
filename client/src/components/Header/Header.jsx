import React from 'react'
import { Link } from "react-router-dom"

const Header = () => {
    return (
        <header className=' '>
            <nav className=''>
                <Link to="/" className=''>
                    Auth
                </Link>

                <div className=''>
                    <Link to="#">
                        Posts
                    </Link>

                    <Link to="/">
                        <img className=' ' alt='profile image' />
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header