/**
 * ENGLISH
 * Displays an individual product card with add/remove cart functionality
 * @component
 * @param {Object} props - Product item properties
 * @param {string} props.title - Product name
 * @param {string} props.image - Product image URL
 * @param {number} props.price - Product price
 * @param {string} props.description - Product description
 * @param {string} props.category - Product category
 * @param {number|string} props.id - Unique product identifier
 * @example
 * <ProductItem
 *   title="Laptop"
 *   image="laptop.jpg"
 *   price={999}
 *   description="Powerful device"
 *   category="electronics"
 *   id={1}
 * />
 */

/**
 * ESPAÑOL
 * Muestra una tarjeta individual de producto con funcionalidad para agregar o quitar del carrito
 * @component
 * @param {Object} props - Propiedades del producto
 * @param {string} props.title - Nombre del producto
 * @param {string} props.image - URL de la imagen del producto
 * @param {number} props.price - Precio del producto
 * @param {string} props.description - Descripción del producto
 * @param {string} props.category - Categoría del producto
 * @param {number|string} props.id - Identificador único del producto
 * @example
 * <ProductItem
 *   title="Laptop"
 *   image="laptop.jpg"
 *   price={999}
 *   description="Dispositivo potente"
 *   category="electronics"
 *   id={1}
 * />
 */

import { useCartStore } from "../stores/useCartStore";
import { memo } from "react";

const ProductItem = memo(function ProductItem({
  title,
  image,
  price,
  description,
  category,
  id,
}) {
  const { addToCart, removeFromCart } = useCartStore();
  const item = { title: title, id: id };

  return (
    <article className="product-card">
      <img src={image} alt={title} className="product-image" loading="lazy" />
      <div className="product-details">
        <h3 className="product-title">{title}</h3>
        <span className="product-price">${price.toFixed(2)}</span>
        <p className="product-description">{description}</p>
        <span className="product-category">{category}</span>
      </div>
      <div className="product-actions">
        <button
          onClick={() => addToCart(item)}
          className="add-button"
          aria-label={`Add ${title} to cart`}
        >
          Add to Cart
        </button>
        <button
          onClick={() => removeFromCart(item)}
          className="remove-button"
          aria-label={`Remove ${title} from cart`}
        >
          Remove from Cart
        </button>
      </div>
    </article>
  );
});

export default ProductItem;
