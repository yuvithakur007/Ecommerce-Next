import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/cart.module.css"; // Import CSS module
import { useDarkMode } from '../context/DarkModeContext'; // Import useDarkMode hook

const Cart = () => {
  const { state } = useDarkMode(); 

  const [cartItems, setCartItems] = useState([]);
  const [cartProducts, setCartProducts] = useState([]);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(`https://ecommerce-knol.onrender.com/api/carts`, {
          headers: {
            Authorization: token,
          },
        });
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };

    const fetchProduct = async (id) => {
      try {
        const response = await axios.get(
          `https://ecommerce-knol.onrender.com/api/products/${id}`
        );
        return response.data;
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    const fetchAllCartProducts = async () => {
      try {
        const productPromises = cartItems.map(fetchProduct);
        const products = await Promise.all(productPromises);
        setCartProducts(products);
      } catch (error) {
        console.error("Error fetching cart products:", error);
      }
    };

    fetchCartItems();
    fetchAllCartProducts();
  }, [cartItems]);

  const handleDeleteItem = async (itemId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`https://ecommerce-knol.onrender.com/api/carts/delete/${itemId}`, {
        headers: {
          Authorization: token,
        },
      });
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(`https://ecommerce-knol.onrender.com/api/orders/place-order`, null, {
        headers: {
          Authorization: token,
        },
      });
      console.log("Order placed successfully");
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  return (
    <div className={state.darkMode ? style.darkMode : style.lightMode}> {/* Use style object */}
      <div className={style.cartContainer}> {/* Use style object */}
        <h1>Cart</h1>
        {cartProducts.length > 0 ? (
          <div className={style.cartProducts}> {/* Use style object */}
            <table className={style.cartTable}> {/* Use style object */}
              <thead>
                <tr className={style.cartTableHeader}> {/* Use style object */}
                  <th>Name</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cartProducts.map((item) => (
                  <tr key={item._id} className={style.cartItem}>
                    <td style={{ paddingRight: "0rem" }}>
                      <img className={style.cartItemImage}
                        src={item.image}
                        alt={item.name}
                      />
                      <br />
                      {item.name}
                    </td>

                    <td>${item.price}</td>
                    <td>
                      <button onClick={() => handleDeleteItem(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={style.totalAmount}> {/* Use style object */}
              <p>
                Total: $
                {cartProducts.reduce(
                  (total, product) => total + product.price,
                  0
                )}
              </p>
            </div>
            <button onClick={handlePlaceOrder}>Place Order</button>
          </div>
        ) : (
          <div>
               <p style={{ margin: "1.5rem" }}>No products in the cart.</p>
          <p>Loading...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
