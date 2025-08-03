/**
 * ENGLISH
 * Header component with search input and cart indicator
 * @component
 * @example
 * <Header />
 */

/**
 * ESPAÑOL
 * Componente de encabezado con campo de búsqueda e indicador del carrito
 * @component
 * @example
 * <Header />
 */

import { useCartStore } from "../stores/useCartStore";
import { memo } from "react";

const Header = memo(function Header() {
  const { filter, setFilter } = useCartStore();
  const cartCount = useCartStore((state) => state.cart.length);

  return (
    <header className="app-header" role="banner">
      <form className="search-form" role="search">
        <div className="search-input-container">
          <img
            src="/assets/search.svg"
            alt="Search"
            aria-hidden="true"
            className="search-icon"
          />
          <input
            type="search"
            name="search"
            placeholder="Search products..."
            defaultValue={filter}
            onChange={(e) => setFilter(e.target.value)}
            aria-label="Search products"
            className="search-input"
          />
        </div>
      </form>

      <div className="cart-container">
        <button
          className="cart-button"
          aria-label={`Shopping cart with ${cartCount} items`}
        >
          <img
            src="/assets/shopping-cart.svg"
            alt="Shopping Cart"
            aria-hidden="true"
          />
          {cartCount > 0 && (
            <span className="cart-badge" aria-hidden="true">
              {cartCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
});

export default Header;
