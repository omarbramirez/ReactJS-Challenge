/**
 * ENGLISH
 * Displays a filtered list of products
 * @component
 * @param {Object[]} products - Array of product objects
 * @example
 * const products = [{id: 1, title: 'Product 1'}, ...]
 * return <ProductList products={products} />
 */

/**
 * ESPAÑOL
 * Muestra una lista filtrada de productos
 * @component
 * @param {Object[]} products - Arreglo de objetos de producto
 * @example
 * const products = [{id: 1, title: 'Producto 1'}, ...]
 * return <ProductList products={products} />
 */

import ProductItem from "./ProductItem";
import { useCartStore } from "../stores/useCartStore";
import { useMemo } from "react";

function ProductList({ products }) {
  const { getFilteredProducts, filter } = useCartStore();

  const filteredProducts = useMemo(() => {
    return getFilteredProducts(products);
  }, [products, filter]);

  if (filteredProducts.length === 0) {
    return (
      <div className="empty-state">
        No products match your search "{filter}"
      </div>
    );
  }

  return (
    <ul>
      {filteredProducts.map((item, index) => (
        <li key={`item-${item.id}`} style={{ "--index": index }}>
          <ProductItem {...item} />
        </li>
      ))}
    </ul>
  );
}

export default ProductList;
