import {
  Image,
  ListGroup,
  Row,
  Col,
  Form,
  Button,
  Card,
} from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../slices/cartSlice";
import Message from "../components/Message";
import { Link, useNavigate } from "react-router-dom";
import { FaTrash } from "react-icons/fa";

const CartScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cart = useSelector((state) => state.cart);
  const { cartItems } = cart;

  const addToCartHandler = async (item, qty) => {
    dispatch(addToCart({ ...item, qty }));
  };

  const removeFromCartHandler = async (id) => {
    dispatch(removeFromCart(id));
  };

  const checkoutHandler = () => {
    navigate("/sign-in?redirect=/shipping");
  };

  return (
    <>
      <Row>
        <Col md={8}>
          <h1>Shopping Cart</h1>
          {cartItems.length === 0 ? (
            <>
              <Message>Your cart is empty</Message>
              <Link className="btn btn-light my-3" to="/">
                Go Back
              </Link>
            </>
          ) : (
            <ListGroup variant="flush">
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row>
                    <Col md={2}>
                      <Image src={item.image} alt={item.name} fluid rounded />
                    </Col>

                    <Col md={3} className="d-flex align-items-center">
                      <Link to={`/product/${item._id}`}>{item.name}</Link>
                    </Col>

                    <Col md={2} className="d-flex align-items-center">
                      Rs. {item.price}
                    </Col>

                    <Col md={2} sm={1} className="d-flex align-items-center">
                      <Form.Control
                        as="select"
                        value={item.qty}
                        onChange={(e) =>
                          addToCartHandler(item, Number(e.target.value))
                        }
                      >
                        {[...Array(item.countInStock).keys()].map((k) => (
                          <option key={k + 1} value={k + 1}>
                            {k + 1}
                          </option>
                        ))}
                      </Form.Control>
                    </Col>

                    <Col md={2} className="d-flex align-items-center">
                      <Button
                        type="button"
                        variant="light"
                        onClick={() => removeFromCartHandler(item._id)}
                      >
                        <FaTrash />
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>

        <Col md={4}>
          <Card>
            <ListGroup variant="flush">
              <ListGroup.Item>
                <h3>
                  Subtotal of ({cartItems.reduce((a, c) => a + c.qty, 0)}) items
                </h3>
                <h5>
                  Rs.{" "}
                  {cartItems.reduce(
                    (acc, item) => acc + item.price * item.qty,
                    0
                  )}
                </h5>
              </ListGroup.Item>

              <ListGroup.Item>
                <Button
                  type="button"
                  className="btn-block"
                  disabled={cartItems.length === 0}
                  onClick={checkoutHandler}
                >
                  CHECKOUT
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default CartScreen;
