import React from 'react'
import { NavLink } from 'react-router-dom'

const MobileCategories = () => {
  return (
    <div className="mobileCategories">
      <NavLink to="/all-products">All</NavLink>
      <NavLink to="/fruit-products">Fruits</NavLink>
      <NavLink to="/vegetables">Vegetables</NavLink>
      <NavLink to="/food-grains">Grains</NavLink>
    </div>
  )
}

export default MobileCategories