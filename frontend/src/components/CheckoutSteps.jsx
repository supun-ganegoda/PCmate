import React from "react";
import { Nav } from "react-bootstrap";
import { FaCheckCircle } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const CheckoutSteps = ({ step1, step2, step3, step4, index }) => {
  return (
    <Nav className="justify-content-center mb-12">
      <Nav.Item>
        {step1 ? (
          <div className="d-flex align-items-center justify-content-center ">
            <LinkContainer to="/sign-in">
              <Nav.Link>Sign In</Nav.Link>
            </LinkContainer>
            <FaCheckCircle style={{ color: "green" }} />
          </div>
        ) : (
          <Nav.Link disabled>Sign In</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step2 ? (
          <div className="d-flex align-items-center justify-content-center ">
            <LinkContainer to="/shipping">
              <Nav.Link>Shipping</Nav.Link>
            </LinkContainer>
            {index > 2 ? (
              <FaCheckCircle style={{ color: "green" }} />
            ) : (
              <FaCheckCircle style={{ color: "grey" }} />
            )}
          </div>
        ) : (
          <Nav.Link disabled>Shipping</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step3 ? (
          <div className="d-flex align-items-center justify-content-center ">
            <LinkContainer to="/payment">
              <Nav.Link>Payment</Nav.Link>
            </LinkContainer>
            {index > 3 ? (
              <FaCheckCircle style={{ color: "green" }} />
            ) : (
              <FaCheckCircle style={{ color: "grey" }} />
            )}
          </div>
        ) : (
          <Nav.Link disabled>Payment</Nav.Link>
        )}
      </Nav.Item>

      <Nav.Item>
        {step4 ? (
          <div className="d-flex align-items-center justify-content-center ">
            <LinkContainer to="/place-order">
              <Nav.Link>Place Order</Nav.Link>
            </LinkContainer>
            {index > 4 ? (
              <FaCheckCircle style={{ color: "green" }} />
            ) : (
              <FaCheckCircle style={{ color: "grey" }} />
            )}
          </div>
        ) : (
          <Nav.Link disabled>Place Order</Nav.Link>
        )}
      </Nav.Item>
    </Nav>
  );
};

export default CheckoutSteps;
