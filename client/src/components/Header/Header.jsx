import React from 'react'
import { Link } from "react-router-dom"
import "./Header.css"

const Header = () => {
    return (
        <header className='header '>
            <nav className=''>
                <Link to="/" className=''>
                    Auth
                </Link>

                <div className=''>
                    <Link to="#">
                        Posts
                    </Link>

                    <Link to="/">
                        <img className=' ' src='' alt='profile image' />
                    </Link>
                </div>
            </nav>
        </header>
    )
}

export default Header