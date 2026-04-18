
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { productUrl, imageUrl, cartUrl } from "../repo/api_path";
import useAuthStore from "../store/useAuthStore";
import toast from "react-hot-toast";

const DetailComponent = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  const { isLoggedIn, incrementCart } = useAuthStore();

  // ==========================
  // Fetch Product
  // ==========================
  const singleHandler = async () => {
    try {
      const res = await axios.get(`${productUrl}/${id}`);
      setProduct(res.data.record || null);
    } catch (error) {
      console.log(error.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    singleHandler();
  }, [id]);

  // ==========================
  // Add To Cart
  // ==========================
  const addToCartHandler = async () => {
    try {
      if (!isLoggedIn) {
        toast.error("Please login first ❌");
        return;
      }

      const token = localStorage.getItem("userToken");

      await axios.post(
        `${cartUrl}/add-to-cart`,
        {
          productId: product._id,
          quantity: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Added to cart 🛒");
      incrementCart(1);

    } catch (error) {
      console.log(error.response?.data || error.message);
      toast.error("Something went wrong ❌");
    }
  };
  // ==========================
  // Save for later
  // ==========================

  const saveForLaterHandler = () => {
  toast.success("Saved for later ⭐");
};
  // ==========================
  // LOADING UI (Better)
  // ==========================
  if (loading) {
    return (
      <div className="detailSection">
        <div className="imgCont">
          <div className="skeleton singleImage "></div>
        </div>
        <div className="singleDetail">
          <div className="skeleton textLarge"></div>
          <div className="skeleton text"></div>
          <div className="skeleton text"></div>
        </div>
      </div>
    );
  }

  if (!product) return <h2 className="emptyState">Product not found 😕</h2>;

  return (
    <div className="detailSection">

      {/* IMAGE */}
      <div className="imgCont">
        <img
          className="singleImage"
          src={`${imageUrl}${product.image}`}
          alt={product.name}
        />
      </div>

      {/* DETAILS */}
      <div className="singleDetail">
        
        <div className="singleName">
          {product.name}
        </div>

        <div className="singlePrice">
          ₹ {product.price}
        </div>

        <div className="singleDesc">
          {product.desc}
        </div>

        <div className="singleBtn">
          <button
            className="singleCartBtn"
            onClick={addToCartHandler}
          >
            Add To Cart
          </button>

          <button className="singleLaterBtn" onClick={saveForLaterHandler}>
            Save for later
          </button>
        </div>
      </div>
    </div>
  );
};

export default DetailComponent;