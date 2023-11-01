import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Badge, Navbar, Nav, Container } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSelector } from "react-redux";
import styles from "./Header.module.scss";
import React from "react";

function Header() {
  const { cartItems } = useSelector((state) => state.cart);

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

              <LinkContainer to="/sign-in">
                <Nav.Link>
                  <FaUser /> Sign in
                </Nav.Link>
              </LinkContainer>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
