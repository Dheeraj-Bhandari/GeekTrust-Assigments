import React from 'react'
import { Routes, Route } from 'react-router'
import Cart from '../components/Cart'
import NavBar from '../components/NavBar'
import ProductListing from '../components/ProductListing'

const TeerexRoute = () => {
  return (
    <>
    <Routes>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/" element={<NavBar/>} />
        <Route path="/products" element={<ProductListing/>} />
        
    </Routes>
    </>
  )
}

export default TeerexRoute