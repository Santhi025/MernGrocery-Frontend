import React from 'react'
import { NavLink } from 'react-router-dom'
const SearchComp = () => {
  return (
    <div className="mainContainer">
      <div className='shopSection'>
      <div className="shopTitle">Shop by Items</div>

      <ul>
        <li>
          <NavLink 
            to="/all-products"
            className={({ isActive }) => isActive ? "activeLink" : ""}
          >
            All Products
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/fruit-products"
            className={({ isActive }) => isActive ? "activeLink" : ""}
          >
            Fruits
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/vegetables"
            className={({ isActive }) => isActive ? "activeLink" : ""}
          >
            Vegetables
          </NavLink>
        </li>

        <li>
          <NavLink 
            to="/food-grains"
            className={({ isActive }) => isActive ? "activeLink" : ""}
          >
            Food Grains
          </NavLink>
        </li>
      </ul>
    </div>
    </div>
  )
}

export default SearchComp