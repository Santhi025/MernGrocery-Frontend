import React from 'react'
import GetProducts from './components/GetProducts'
import AddProduct from './admin/AddProduct'
import LandingPage from './pages/LandingPage'
import { Route, Routes } from 'react-router-dom'
import DetailComponent from './components/DetailComponent'
import Navbar from './components/Navbar'
import SendOtp from './user_email/SendOtp'
import OtpVerify from './user_email/OtpVerify'
import ShowCart from './components/ShowCart'
import Invoice from './components/Invoice'
import FruitProducts from './products/FruitProducts'
import SearchComp from './components/SearchComp'
import AllProducts from './products/AllProducts'
import VegetableProducts from './products/VegetableProducts'
import FoodGrains from './products/FoodGrains'
import { Toaster } from "react-hot-toast";
import MobileCategories from './components/mobileCategories'
const App = () => {
  return (
    <div>
<Toaster
  position="top-right"
  gutter={12}
  containerStyle={{ top: 80 }}
  toastOptions={{
    duration: 3000,
    style: {
      fontSize: "15px",
      padding: "16px",
      borderRadius: "12px",
      boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
      zIndex: 10000,
    },
  }}
/>
       <Navbar />
       <MobileCategories />
      <SearchComp />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/single/:id' element={<DetailComponent />} />
        <Route path='/send-otp' element={<SendOtp />} />
        <Route path='/verify-otp' element={<OtpVerify />} />
        <Route path='/cart' element={<ShowCart />} />
        <Route path='/invoice' element={<Invoice />} />
        <Route path='/add-product' element={<AddProduct />} />
        <Route path='/all-products' element={<AllProducts />} />
        <Route path='/fruit-products' element={<FruitProducts />} />
        <Route path='/vegetables' element={<VegetableProducts />} />
        <Route path='/food-grains' element={<FoodGrains />} />
      </Routes>
      
    </div>
  )
}

export default App