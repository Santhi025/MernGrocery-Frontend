import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import logo from "../assets/logo.svg";
import useAuthStore from "../store/useAuthStore";
import useSearchStore from "../store/useSearchStore";

const Navbar = () => {
  const { isLoggedIn, user, logout, initializeAuth, cartCount } =
    useAuthStore();

  const { search, setSearch } = useSearchStore();

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    initializeAuth();
  }, []);

  //confirm logout
  const handleLogoutConfirm = () => {
    logout();
    setShowModal(false);
    toast.success("Logged out successfully");
  };

  return (
    <div className="navSection">
      <Link to="/" className="logoLink">
        <div className="logoWrapper">
          <img src={logo} alt="Small Basket" className="logo" />
          <span className="title">Small Basket</span>
        </div>
      </Link>


      <div className="search">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <Link to="/cart">
        <div className="cartIcon">
          <ShoppingCart size={22} />
          {cartCount > 0 && (
            <span className="cartBadge">{cartCount}</span>
          )}
        </div>
      </Link>

      <div className="userName">
        {user && (
          <>
            Welcome <span className="userHighlight">{user}</span>
          </>
        )}
      </div>

      <div className="auth">
        {isLoggedIn ? (
          <button onClick={() => setShowModal(true)}>
            Logout
          </button>
        ) : (
          <Link to="/send-otp">
            <button>Login</button>
          </Link>
        )}
      </div>

      {/* Modal UI */}
      {showModal && (
        <div className="modalOverlay">
          <div className="modalBox">
            <h2>Confirm Logout</h2>
            <p>Are you sure you want to logout?</p>

            <div className="modalActions">
              <button
                className="cancelBtn"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>

              <button
                className="logoutBtn"
                onClick={handleLogoutConfirm}
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;