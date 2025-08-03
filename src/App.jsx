/**
 * ENGLISH
 * Main component of the application that handles:
 * - Fetching products from the API
 * - Global loading/error state
 * - Rendering of the main layout
 */

/**
 * ESPAÑOL
 * Componente principal de la aplicación que maneja:
 * - Fetching de productos desde API
 * - Estado global de carga/error
 * - Renderizado del layout principal
 */

/**
 * *API Endpoint:*
 * https://fakestoreapi.com/products
 */

import "./styles.css";
import ProductList from "./components/ProductList";
import Header from "./components/Header";

import { useState, useEffect } from "react";

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok)
          throw new Error(`HTTP error! status: ${response.status}`);
        const data = await response.json();
        setProducts(data);
      } catch (err) {
        setError(err.message);
        console.error("Fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="App">
      <h1>Schoppinghauer</h1>
      {isLoading ? (
        <div className="skeleton-product"></div>
      ) : error ? (
        <h3>{error}</h3>
      ) : (
        <>
          <Header />
          <ProductList products={products} />
        </>
      )}
    </div>
  );
}
