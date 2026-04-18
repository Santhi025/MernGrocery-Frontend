import React, { useEffect, useState } from "react";
import axios from "axios";
import { cartUrl, imageUrl } from "../repo/api_path";
import InvoiceSkeleton from "../skeletons/InvoiceSkeleton";
import toast from "react-hot-toast";
import useAuthStore from "../store/useAuthStore";
const Invoice = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const setCartCount = useAuthStore((state) => state.setCartCount);


  const handlePlaceOrder = async () => {
  const token = localStorage.getItem("userToken");

  try {
    await axios.delete(`${cartUrl}/clear-cart`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    toast.success("Order placed successfully 🎉");
    setCart({ items: [] });
     setCartCount(0);

  } catch (error) {
    console.error(error.message);
    toast.error("Something went wrong ❌");
  }
};
  const fetchCart = async () => {
    const token = localStorage.getItem("userToken");

    try {
      const res = await axios.get(`${cartUrl}/cart-details`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setCart(res.data.cart);
      setLoading(false);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  if (loading) return <InvoiceSkeleton />;
  if (!cart || cart.items.length === 0)
    return <h3>No items for checkout</h3>;

  // 🧮 Calculations
  const subTotal = cart.items.reduce((acc, item) => {
    if (!item.product) return acc;
    return acc + item.product.price * item.quantity;
  }, 0);

  const tax = Math.round(subTotal * 0.05); // 5% GST
  const deliveryCharge = subTotal > 500 ? 0 : 40;
  const finalAmount = subTotal + tax + deliveryCharge;

return (
  <div className="invoiceContainer">

    <h2 className="invoiceTitle">🧾 Order Summary</h2>

    {/* ITEMS */}
    <div className="invoiceList">
      {cart.items.map((item) => {
        if (!item.product) return null;

        return (
          <div className="invoiceItem" key={item._id}>
            <div>
              <img
              src={`${imageUrl}${item.product.image}`}
              alt={item.product.name}
            />
            </div>

            <div className="invoiceDetails">
              <h4>{item.product.name}</h4>
              <p>Rs {item.product.price} × {item.quantity}</p>
              <strong>Rs {item.product.price * item.quantity}</strong>
            </div>
          </div>
        );
      })}
    </div>

    {/* SUMMARY */}
    <div className="invoiceSummary">
      <p>
        <span>Subtotal</span>
        <span>Rs {subTotal}</span>
      </p>

      <p>
        <span>GST (5%)</span>
        <span>Rs {tax}</span>
      </p>

      <p>
        <span>Delivery</span>
        <span>
          {deliveryCharge === 0 ? "Free 🚚" : `Rs ${deliveryCharge}`}
        </span>
      </p>

      <h3>
        <span>Total</span>
        <span>Rs {finalAmount}</span>
      </h3>
    </div>

    <div className="checkoutBox">
      {/* <button className="checkoutBtn">
      Place Order
    </button> */}
    <button className="checkoutBtn" onClick={handlePlaceOrder}>
          Place Order
        </button>
    </div>
  </div>
);
};

export default Invoice;