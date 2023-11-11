import { Link, useParams, useNavigate } from "react-router-dom";
import {
  Col,
  ListGroup,
  Row,
  Image,
  Button,
  Card,
  Form,
} from "react-bootstrap";
import {
  useCreateReviewMutation,
  useGetProductDetailsQuery,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import Ratings from "../components/Ratings";
import { useState } from "react";
import { addToCart } from "../slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import Meta from "../components/Meta";

const ProductScreen = () => {
  const { id: productId } = useParams();
  const [qty, setQty] = useState(1);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: product,
    isLoading,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);

  const { userInfo } = useSelector((state) => state.auth);

  const [createReview, { isLoading: loadingReviews }] =
    useCreateReviewMutation();

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, qty }));
    navigate("/cart");
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    if (rating === 0) toast.warning("Set a rating");
    else {
      try {
        const res = await createReview({
          productId,
          rating,
          comment,
        }).unwrap();
        toast.success(res.message);
        refetch();
        setRating(0);
        setComment("");
      } catch (e) {
        toast.error(e?.data?.message || e.error);
      }
    }
  };

  return (
    <>
      <Link className="btn btn-light my-3" to="/">
        Go Back
      </Link>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant={"danger"}>
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Row>
          <Meta title={product.name} />
          <Col md={5}>
            <Image src={product.image} alt={product.name} fluid />
          </Col>

          <Col md={4}>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3> {product.name}</h3>
              </ListGroup.Item>
              <ListGroup.Item>
                <Ratings
                  value={product.rating}
                  text={`${product.numReviews} reviews`}
                />
              </ListGroup.Item>
              <ListGroup.Item>{product.description}</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={3}>
            <Card>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <Row>
                    <Col>Price:</Col>
                    <Col>
                      <strong>{product.price.toFixed(2)}</strong>
                    </Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Status:</Col>
                    <Col>
                      <strong
                        style={
                          product.countInStock === 0 ? { color: "red" } : null
                        }
                      >
                        {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                      </strong>
                    </Col>
                  </Row>
                </ListGroup.Item>

                {product.countInStock > 0 && (
                  <ListGroup.Item>
                    <Row>
                      <Col>QTY</Col>
                      <Col>
                        <Form.Control
                          as="select"
                          value={qty}
                          onChange={(e) => setQty(Number(e.target.value))}
                        >
                          {[...Array(product.countInStock).keys()].map((k) => (
                            <option key={k + 1} value={k + 1}>
                              {k + 1}
                            </option>
                          ))}
                        </Form.Control>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                )}

                <ListGroup.Item>
                  <Row>
                    <Button
                      className="btn btn-light"
                      type="button"
                      disabled={product.countInStock === 0}
                      onClick={handleAddToCart}
                    >
                      Add to Cart
                    </Button>
                  </Row>
                </ListGroup.Item>
              </ListGroup>
            </Card>
          </Col>
        </Row>
      )}

      {!isLoading && (
        <Row>
          <Col md={6}>
            <h2>Reviews</h2>
            {product.reviews.length === 0 ? (
              <Message>No reviews for this product</Message>
            ) : (
              <>
                <div style={{ height: "250px", overflowY: "auto" }}>
                  <ListGroup variant="flush">
                    {product.reviews.map((review) => (
                      <ListGroup.Item
                        key={review._id}
                        className="border rounded border-primary p-2 my-2"
                      >
                        <strong>{review.name}</strong>
                        <Ratings value={review.rating} />
                        <p>
                          {review.createdAt.substring(0, 10)}
                          <br />
                          {review.comment}
                        </p>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                </div>
              </>
            )}
          </Col>

          <Col>
            <ListGroup variant="flush" className="p-2 mt-2">
              <ListGroup.Item>
                <h5>Write a Customer Review</h5>
                {loadingReviews ? (
                  <Loader />
                ) : userInfo && !userInfo.isAdmin ? (
                  <Form
                    className="p-2 rounded"
                    onSubmit={submitHandler}
                    style={{ backgroundColor: "#f5f5f4" }}
                  >
                    <Form.Group controlId="rating" className="my-2">
                      <Form.Label>Rating</Form.Label>
                      <Form.Control
                        as="select"
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                      >
                        <option value="">Select</option>
                        <option value="1">1 - Poor</option>
                        <option value="2">2 - Fair</option>
                        <option value="3">3 - Good</option>
                        <option value="4">4 - Very Good</option>
                        <option value="5">5 - Excellent</option>
                      </Form.Control>

                      <Form.Group controlId="comment" className="my-2">
                        <Form.Label>Comment</Form.Label>
                        <Form.Control
                          as="textarea"
                          row="3"
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        />
                      </Form.Group>
                    </Form.Group>
                    <Button
                      disabled={loadingReviews}
                      type="submit"
                      variant="primary"
                    >
                      Submit
                    </Button>
                  </Form>
                ) : !userInfo?.isAdmin ? (
                  <Message>
                    Please <Link to="/sign-in">login</Link> to write reviews
                  </Message>
                ) : (
                  <Message>You are an admin</Message>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      )}
    </>
  );
};

export default ProductScreen;
