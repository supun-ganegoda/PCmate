import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Badge, Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/usersApiSlice";
import { logout } from "../slices/authSlice";
import { useDispatch } from "react-redux";
import styles from "./Header.module.scss";
import React from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Loader from "./Loader";
import Search from "./Search";

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.auth);

  const [logoutAPICall, { isLoading }] = useLogoutMutation();

  const logoutHandler = async () => {
    try {
      await logoutAPICall().unwrap();
      dispatch(logout());
      navigate("/sign-in");
    } catch (err) {
      toast.error(err?.data?.message || err.message);
    }
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>
              <img
                src="/images/logo_dark.png"
                alt="PC mate logo"
                width="220px"
                height="84px"
              />
            </Navbar.Brand>
          </LinkContainer>

          <Navbar.Toggle aria-controls="basic navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Search />
              <LinkContainer to="/cart">
                <Nav.Link>
                  <FaShoppingCart /> Cart
                  {cartItems.length > 0 && (
                    <Badge className={styles.cartCount} pill bg="success">
                      {cartItems.reduce((a, c) => a + c.qty, 0)}
                    </Badge>
                  )}
                </Nav.Link>
              </LinkContainer>

              {userInfo ? (
                <>
                  <NavDropdown title={userInfo.name} id="username">
                    <LinkContainer to="/profile">
                      <NavDropdown.Item>Profile</NavDropdown.Item>
                    </LinkContainer>

                    <NavDropdown.Item onClick={logoutHandler}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>
                  {isLoading && <Loader />}
                </>
              ) : (
                <LinkContainer to="/sign-in">
                  <Nav.Link>
                    <FaUser /> Sign in
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.isAdmin && (
                <NavDropdown title="Admin Panel" id="adminPanel">
                  <LinkContainer to="/admin/product-list">
                    <NavDropdown.Item>Product List</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/user-list">
                    <NavDropdown.Item>Customer List</NavDropdown.Item>
                  </LinkContainer>

                  <LinkContainer to="/admin/order-list">
                    <NavDropdown.Item>Order List</NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
