import React, { useState, useEffect } from "react";
import axios from "axios";
import style from "../styles/cart.module.css"; 
import { useDarkMode } from '../context/DarkModeContext';
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
      const response = await axios.delete(`https://ecommerce-knol.onrender.com/api/carts/delete/${itemId}`, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        alert(data.message); 
        console.log("Item deleted successfully");
      } else {
        throw new Error('Failed to delete item from cart');
      }
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  
  const handlePlaceOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(`https://ecommerce-knol.onrender.com/api/orders/place-order`, null, {
        headers: {
          Authorization: token,
        },
      });
  
      if (response.status === 200) {
        const data = response.data;
        alert(data.message); 
        console.log("Order placed successfully");
      } else {
        throw new Error('Failed to place order');
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };
  

  return (
    <div className={state.darkMode ? style.darkMode : style.lightMode}> 
      <div className={style.cartContainer}> 
        <h1>Cart</h1>
        {cartProducts.length > 0 ? (
          <div className={style.cartProducts}>
            <table className={style.cartTable}> 
              <thead>
                <tr className={style.cartTableHeader}> 
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
                      <button className={style.cartButton} onClick={() => handleDeleteItem(item._id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className={style.totalAmount}> 
              <p>
                Total: $
                {cartProducts.reduce(
                  (total, product) => total + product.price,
                  0
                )}
              </p>
            </div>
            <button className={style.cartButton} onClick={handlePlaceOrder}>Place Order</button>
          </div>
        ) : (
          <div>
               <p style={{ margin: "1.5rem" }}>No products in the cart.</p>
     
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
