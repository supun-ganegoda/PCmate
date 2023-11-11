import Loader from "./Loader";
import { useGetTopProductsQuery } from "../slices/productsApiSlice";
import Message from "./Message";
import { Carousel, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import styles from "./ProductCarousel.module.scss";

const ProductCarousel = () => {
  const { data: products, isLoading, error } = useGetTopProductsQuery();

  return isLoading ? (
    <Loader />
  ) : error ? (
    <Message variant="danger">{error}</Message>
  ) : (
    <>
      <Carousel pause="hover" className={`mb-4 ${styles.carousel}`}>
        {products.map((product) => (
          <Carousel.Item key={product._id}>
            <Link to={`/product/${product._id}`}>
              <Image
                className={styles.image}
                src={product.image}
                alt={product.name}
                fluid
              />
              <Carousel.Caption className={styles.caption}>
                <h2>
                  {product.name} (Rs. {product.price.toFixed(2)})
                </h2>
              </Carousel.Caption>
            </Link>
          </Carousel.Item>
        ))}
      </Carousel>
    </>
  );
};

export default ProductCarousel;
