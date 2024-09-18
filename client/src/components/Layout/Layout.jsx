import React from 'react'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'

const Layout = ({ children }) => {
    return (
        <>

            <Header />
            <div className='min-h-[90vh] '>
                {children}
            </div>
            <Footer />
        </>
    )
}

export default Layout