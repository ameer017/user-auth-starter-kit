import React from 'react'
import { Routes, Route } from "react-router-dom"
import Home from './components/Home/Home'
import Layout from './components/Layout/Layout'

export default function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={
          <Layout>

            <Home />
          </Layout>

        } />
      </Routes>
    </>
  )
}
