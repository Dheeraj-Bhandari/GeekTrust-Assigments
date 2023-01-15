import React from 'react'
import { Routes, Route } from 'react-router'
import Cart from '../components/Cart'
import HomePage from '../components/HomePage'
import NavBar from '../components/NavBar'
import ProductListing from '../components/ProductListing'

const TeerexRoute = () => {
  return (
    <>
    <Routes>
        <Route path="/cart" element={<Cart/>} />
        <Route path="/" element={<><NavBar/>, <HomePage/></>} />
        <Route path="/products" element={<ProductListing/>} />
        
    </Routes>
    </>
  )
}

export default TeerexRoute