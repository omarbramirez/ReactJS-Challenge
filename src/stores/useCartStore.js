/**
 * ENGLISH
 * Zustand store for cart management and product filtering
 * @typedef {Object} CartStore
 * @property {Array} cart - Array of products in cart
 * @property {string} filter - Current search filter
 * @property {function} addToCart - Adds a product to cart
 * @property {function} removeFromCart - Removes a product from cart
 * @property {function} setFilter - Sets the search filter
 * @property {function} getFilteredProducts - Filters products by title
 */

/**
 * Custom hook for cart state management
 * @returns {CartStore} The cart store instance
 */

/**
 * ESPAÑOL
 * Store de Zustand para la gestión del carrito y el filtrado de productos
 * @typedef {Object} CartStore
 * @property {Array} cart - Arreglo de productos en el carrito
 * @property {string} filter - Filtro de búsqueda actual
 * @property {function} addToCart - Agrega un producto al carrito
 * @property {function} removeFromCart - Elimina un producto del carrito
 * @property {function} setFilter - Establece el filtro de búsqueda
 * @property {function} getFilteredProducts - Filtra productos por título
 */

/**
 * Hook personalizado para la gestión del estado del carrito
 * @returns {CartStore} La instancia del store del carrito
 */

import { create } from "zustand";

// Helper functions
const initializeCart = () => {
  if (typeof window === "undefined") return [];
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (error) {
    console.error("Error reading cart from localStorage:", error);
    return [];
  }
};

const persistCart = (cart) => {
  try {
    localStorage.setItem("cart", JSON.stringify(cart));
  } catch (error) {
    console.error("Error persisting cart:", error);
  }
};

//Global State management
export const useCartStore = create((set, get) => ({
  cart: initializeCart(),
  filter: "",

  // Actions
  addToCart: (product) => {
    const { cart } = get();
    const isRepeated = cart.some((item) => item.id === product.id);
    if (!isRepeated) {
      const updatedCart = [...cart, product];
      set({ cart: updatedCart });
      if (typeof window !== "undefined") {
        persistCart(updatedCart);
      }
    }
  },
  removeFromCart: (product) => {
    const { cart } = get();
    const updatedCart = cart.filter((item) => item.id !== product.id);
    set({ cart: updatedCart });
    if (typeof window !== "undefined") persistCart(updatedCart);
  },
  setFilter: (keyword) => {
    set({ filter: keyword });
  },
  getFilteredProducts: (products) => {
    const { filter } = get();
    if (!filter) return products;

    return products.filter((item) => item.title.toLowerCase().includes(filter));
  },
}));
