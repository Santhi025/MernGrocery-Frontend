import axios from "axios";
import React, { useEffect, useState } from "react";
import { cartUrl, imageUrl } from "../repo/api_path";
import useAuthStore from "../store/useAuthStore";
import Checkout from "./Checkout";
import toast from "react-hot-toast";
import CartSkeleton from "../skeletons/cartSkeleton";

const ShowCart = () => {
  const [cartDetail, setCartDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  const { setCartCount } = useAuthStore();

  const cartHandler = async () => {
    const userToken = localStorage.getItem("userToken");

    try {
      const res = await axios.get(`${cartUrl}/cart-details`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      setCartDetail(res.data.cart);
      setCartCount(res.data.cart.items.length || 0);

    } catch (error) {
      console.error(error.response?.data || error.message);
      toast.error("Failed to load cart ❌");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cartHandler();
  }, []);

  // ==========================
  // DELETE ITEM
  // ==========================
  const deleteHandler = async (productId) => {
    const userToken = localStorage.getItem("userToken");

    try {
      await axios.delete(`${cartUrl}/delete/${productId}`, {
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
      });

      toast.success("Item removed 🗑️");

      // refresh cart
      cartHandler();

    } catch (error) {
      toast.error("Failed to delete ❌");
    }
  };

  // ==========================
  // LOADING UI
  // ==========================
 if (loading) {
  return <CartSkeleton />;
}

  // ==========================
  // EMPTY STATE
  // ==========================
  if (!cartDetail || cartDetail.items.length === 0) {
    return <div className="cartEmpty">Your cart is empty 🛒</div>;
  }

  return (
    <div className="cartContainer">
      <div className="cartTitle">My Cart</div>

      {cartDetail.items.map((item) => {
        if (!item.product) return null;

        return (
          <div className="cartItem" key={item._id}>

            <img
              src={`${imageUrl}${item.product.image}`}
              alt={item.product.name}
            />

            <div className="subCart">
              <h4>{item.product.name}</h4>
              <p>Price: ₹ {item.product.price}</p>
              <p>Quantity: {item.quantity}</p>
              <strong>
                ₹ {item.product.price * item.quantity}
              </strong>
            </div>

            <button
              className="cartDelete"
              onClick={() => deleteHandler(item.product._id)}
            >
              Remove
            </button>
          </div>
        );
      })}

      <Checkout />
    </div>
  );
};

export default ShowCart;