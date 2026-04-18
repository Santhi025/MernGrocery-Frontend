import { create } from "zustand";

const useAuthStore = create((set, get) => ({
  user: null,
  isLoggedIn: false,
  cartCount: 0,

  login: (userData, token) => {
  localStorage.setItem("userToken", token);
  localStorage.setItem("user", JSON.stringify(userData));

  // restore cart count
  const storedCart = localStorage.getItem("cartCount");

  set({
    user: userData,
    isLoggedIn: true,
    cartCount: storedCart ? Number(storedCart) : 0,
  });
},

  incrementCart: (count = 1) => {
    const updated = get().cartCount + count;
    localStorage.setItem("cartCount", updated);
    set({ cartCount: updated });
  },

  setCartCount: (count) => {
    localStorage.setItem("cartCount", count);
    set({ cartCount: count });
  },

 logout: () => {
  localStorage.clear();
  set({
    user: null,
    isLoggedIn: false,
    cartCount: 0,
  });
},

  initializeAuth: () => {
    const token = localStorage.getItem("userToken");
    const storedUser = localStorage.getItem("user");
    const storedCart = localStorage.getItem("cartCount");

    if (token && storedUser) {
      set({
        isLoggedIn: true,
        user: JSON.parse(storedUser),
      });
    }

    if (storedCart) {
      set({ cartCount: Number(storedCart) });
    }
  },
}));

export default useAuthStore;