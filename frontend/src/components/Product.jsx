import React from "react";
import styles from "./Product.module.scss";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Ratings from "./Ratings";

function Product({ product }) {
  return (
    <Card className={`my-3 p-3 rounded ${styles.card}`}>
      <Link to={`/product/${product._id}`}>
        <Card.Img src={product.image} variant="top" className={styles.image} />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="div" className={styles.cardTitle}>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
        <Card.Text as="div">
          <Ratings
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as="h3">Rs. {product.price.toFixed(2)}</Card.Text>
      </Card.Body>
    </Card>
  );
}

export default Product;
