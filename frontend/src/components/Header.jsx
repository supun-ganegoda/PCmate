import { FaShoppingCart, FaUser } from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";
import React from "react";

function Header() {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
        <Container>
          <Navbar.Brand href="/">PC mate</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link href="/cart">
                <FaShoppingCart /> Cart
              </Nav.Link>
              <Nav.Link href="/cart">
                <FaUser /> Sign in
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
