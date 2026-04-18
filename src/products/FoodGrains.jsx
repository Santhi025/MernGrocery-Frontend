import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { cartUrl, imageUrl, productUrl } from '../repo/api_path'
import { Link } from 'react-router-dom'
import useAuthStore from '../store/useAuthStore'
import useSearchStore from '../store/useSearchStore'
import toast from "react-hot-toast";

const FoodGrains = () => {
  const [grains, setGrains] = useState([])
  const [unitPrice, setUnitPrice] = useState({})
  const [loading, setLoading] = useState(true)

  const { incrementCart } = useAuthStore()
  const { search } = useSearchStore()

  const quantity = 1

  const grainHandler = async () => {
    try {
      const res = await axios.get(`${productUrl}/search?category=food-grains`)
      setGrains(res.data || [])
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    grainHandler()
  }, [])

  const handleUnitChange = (productId, unit, basePrice) => {
    let price = basePrice

    if (unit === "500g") price = basePrice / 2
    if (unit === "2kg") price = basePrice * 2
    if (unit === "5kg") price = basePrice * 5

    setUnitPrice((prev) => ({
      ...prev,
      [productId]: price,
    }))
  }

  const cartHandler = async (productId) => {
    const userToken = localStorage.getItem("userToken")

    try {
      await axios.post(
        `${cartUrl}/add-to-cart`,
        { productId, quantity },
        {
          headers: { Authorization: `Bearer ${userToken}` },
        }
      )

      toast.success("Added to cart 🌾")
      incrementCart(quantity)

    } catch (error) {
      toast.error("Please login first ❌")
    }
  }

  // SEARCH FILTER 
  const filteredGrains = grains.filter((product) =>
    product?.name?.toLowerCase().includes(search?.toLowerCase() || "")
  )

  return (
    <div>
      <div className="itemTitle">
        Category: <span>Food Grains</span>
      </div>

      <div className="productSection">

        {/* LOADING */}
        {loading &&
          Array(12).fill().map((_, i) => (
            <div className="proSection" key={i}>
              <div className="skeleton img"></div>
              <div className="skeleton text"></div>
            </div>
          ))
        }

        {/* EMPTY */}
        {!loading && filteredGrains.length === 0 && (
          <h2 className="emptyState">
            {search ? "No matching grains found 🔍" : "No grains found 😕"}
          </h2>
        )}

        {/* PRODUCTS */}
        {!loading && filteredGrains.map((product) => (
          <section className="proSection" key={product._id}>

            <Link to={`/single/${product._id}`}>
              <div className="proImage">
                <img src={`${imageUrl}${product.image}`} alt={product.name} />
                <h3 className="proName">{product.name}</h3>
              </div>
            </Link>

            <div className="proSub">
              <select
                className="proSelect"
                onChange={(e) =>
                  handleUnitChange(
                    product._id,
                    e.target.value,
                    product.price
                  )
                }
              >
                <option value="1kg">1kg</option>
                <option value="2kg">2kg</option>
                <option value="5kg">5kg</option>
              </select>

              <h3 className="proPrice">
                Rs {unitPrice[product._id] ?? product.price}
              </h3>
            </div>

            <button
              className="proButton"
              onClick={() => cartHandler(product._id)}
            >
              Add to Cart
            </button>
          </section>
        ))}
      </div>
    </div>
  )
}

export default FoodGrains