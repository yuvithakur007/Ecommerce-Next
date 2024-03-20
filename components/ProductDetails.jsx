import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from 'next/router';
import styles from "../styles/details.module.css";
import { useDarkMode } from "../context/DarkModeContext";

const ProductDetails = () => {
  const router = useRouter();
  const { id } = router.query;
  
  const [product, setProduct] = useState(null);
  const { state } = useDarkMode();

  useEffect(() => {
    console.log("Product ID:", id);
    if (id) {
      fetchProduct(id);
    }
  }, [id]);

  const fetchProduct = async (id) => {
    try {
      const response = await axios.get(
        `https://ecommerce-knol.onrender.com/api/products/${id}`
      );
      setProduct(response.data);
    } catch (error) {
      console.error("Error fetching product:", error);
    }
  };

  const handleClick = (e) => {
    e.preventDefault();

    if (localStorage.getItem('token')) {
      fetch("https://ecommerce-knol.onrender.com/api/carts/additem", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("token"),
        },
        body: JSON.stringify({ id: product._id }),
      });
    } else {
      if (window.confirm('"Please Login to add to cart"')) {
        window.location.href = '/login';
      }
    }
  };

  return (
    <div className={state.darkMode ? styles.darkMode : styles.lightMode}>
  
      <div className={styles.productDetailsContainer}>
        {product && (
          <div className={styles.productDetails}>
            <div className={styles.productDetailsImage}>
              <img src={product.image} alt={product.name} />
            </div>
            <div className={styles.productInfo}>
              <h2 className={styles.productDetailsName}>{product.name}</h2>
              <p className={styles.productDetailsDescription}>{product.description}</p>
              <p className={styles.productDetailsCategory}>Category: {product.category}</p>
              <div className={styles.detailsRating}>
                <span>Rating: ★{product.avgRating}</span>
              </div>
              <p className={styles.productDetailsPrice}>Price: ${product.price}</p>
              <div className={styles.productDetailsActions}>
                <button className={styles.addCart} onClick={handleClick}>
                  Add to cart
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );  
};

export default ProductDetails;
