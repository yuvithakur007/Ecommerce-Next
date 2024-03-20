import React from "react";
import Link from "next/link";
import styles from "../styles/products.module.css";

export default function ProductCard(props) {
  return (
    <div className={styles.productListContainer}>
      <div className={styles.productList}>
        <Link href={`/product/${props.id}`} className={styles.productLink}>
          <div key={props._id} className={styles.productCard}>
            
            <img
              src={props.image}
              className={styles.productImage}
              alt={props.name}
            />

            <div className={styles.productTextBox}>
              <h5 className={styles.productName}>{props.name}</h5>

              <div className={styles.rating}>
                <span>Rating: ★{props.avgRating}</span>
              </div>

              <div className={styles.productPrice}>
                <span>Price: ${props.price}</span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
}
