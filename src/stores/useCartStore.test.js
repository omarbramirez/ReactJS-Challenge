/**
 * ENGLISH
 * Unit and integration tests for the Zustand store `useCartStore`.
 *
 * This test suite validates:
 *  - Cart management (add operation)
 *  - Persistence in localStorage
 *  - Product filtering logic by title
 *  - Visual behavior of the `ProductList` component in relation to the global state
 *
 * Considerations:
 *  - Mocked products are used to ensure controlled test conditions
 *  - `@testing-library/react` and `act()` are used to guarantee proper React state updates
 */

/**
 * ESPAÑOL
 * Pruebas unitarias y de integración para la store Zustand `useCartStore`.
 *
 * Esta suite valida:
 *  - Gestión del carrito (agregar)
 *  - Persistencia en localStorage
 *  - Lógica de filtrado de productos por título
 *  - Comportamiento visual del componente `ProductList` frente al estado global
 *
 * Consideraciones:
 *  - Se utilizan productos mockeados para pruebas controladas
 *  - Se usa `@testing-library/react` y `act()` para asegurar actualización del estado de React
 */

import { render, screen, act } from "@testing-library/react";
import { useCartStore } from "./useCartStore";
import ProductList from "../components/ProductList";
import userEvent from "@testing-library/user-event";

const mockProducts = [
  {
    id: 1,
    title: "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
    price: 109.95,
    description:
      "Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
    category: "men's clothing",
    image: "https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg",
  },
  {
    id: 2,
    title: "Mens Casual Premium Slim Fit T-Shirts",
    price: 22.3,
    description:
      "Slim-fitting style, contrast raglan long sleeve, three-button henley placket, light weight & soft fabric for breathable and comfortable wearing. And Solid stitched shirts with round neck made for durability and a great fit for casual fashion wear and diehard baseball fans. The Henley style round neckline includes a three-button placket.",
    category: "men's clothing",
    image:
      "https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg",
  },
];

describe("useCartStore", () => {
  beforeEach(() => {
    useCartStore.setState({
      cart: [],
      filter: "",
    });
  });

  describe("addToCart", () => {
    test("Add a product to the cart", () => {
      const { addToCart } = useCartStore.getState();

      act(() => {
        addToCart(mockProducts[0]);
      });

      const { cart } = useCartStore.getState();
      expect(cart[0].title).toBe(
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      );
    });

    test("Persist state to localStorage", () => {
      const { addToCart } = useCartStore.getState();

      act(() => {
        addToCart(mockProducts[0]);
      });

      expect(JSON.parse(localStorage.getItem("cart"))).toHaveLength(1);
    });
  });

  describe("filter", () => {
    test("Filter products correctly", () => {
      const { setFilter, getFilteredProducts } = useCartStore.getState();

      act(() => {
        setFilter("laptop");
      });

      const filtered = getFilteredProducts(mockProducts);
      expect(filtered).toHaveLength(1);
      expect(filtered[0].title).toBe(
        "Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops"
      );
    });

    test("Returns all products when the filter is empty", () => {
      const { getFilteredProducts } = useCartStore.getState();
      const filtered = getFilteredProducts(mockProducts);
      expect(filtered).toHaveLength(2);
    });
  });

  test("The ProductList component displays filtered products", () => {
    act(() => {
      useCartStore.setState({ filter: "laptop" });
    });

    render(<ProductList products={mockProducts} />);
    expect(
      screen.getByText("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    ).toBeInTheDocument();
    expect(
      screen.queryByText("Mens Casual Premium Slim Fit T-Shirtss")
    ).not.toBeInTheDocument();
  });
});
