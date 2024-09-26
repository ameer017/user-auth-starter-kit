import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'
import Profile from './page/profile/Profile'
import ChangePassword from './page/auth/ChangePassword'
import ResetPassword from './page/auth/ResetPassword'
import Login from './page/auth/Login'
import Register from './page/auth/Register'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Layout>

            <Home />
          </Layout>

        } />

        <Route path='/register' element={<Layout>
          <Register />
        </Layout>} />

        <Route path='/login' element={<Layout>
          <Login />
        </Layout>} />

        <Route path='/profile' element={<Layout>
          <Profile />
        </Layout>} />

        <Route path='/change-password' element={<Layout>
          <ChangePassword />
        </Layout>} />

        <Route path='/reset-password' element={<Layout>
          <ResetPassword />
        </Layout>} />

      </Routes>
    </>
  )
}
