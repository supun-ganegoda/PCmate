import { Form, Button, Col } from "react-bootstrap";
import FormContainer from "../components/FormContainer";
import CheckoutSteps from "../components/CheckoutSteps";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { savePaymentMethod } from "../slices/cartSlice";

const PaymentScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");
  const [paymentMethod2, setPaymentMethod2] = useState("CreditCard");

  const { shippingAddress } = useSelector((state) => state.cart);

  useEffect(() => {
    if (!shippingAddress) navigate("/shipping");
  }, [shippingAddress, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod));
    navigate("/place-order");
  };

  return (
    <>
      <CheckoutSteps step1 step2 step3 index={3} />
      <FormContainer>
        <h1>Payment Method</h1>

        <Form onSubmit={handleSubmit}>
          <Form.Group className="py-3">
            <Form.Label as="legend">Select Method</Form.Label>
            <Col>
              <Form.Check
                type="radio"
                className="my-2"
                label="PayPal"
                id="PayPal"
                name="paymentMethod"
                value={paymentMethod}
                checked
                onChange={(e) => setPaymentMethod(e.target.value)}
              ></Form.Check>

              <Form.Check
                type="radio"
                className="my-2"
                label="Credit Card"
                id="creditCard"
                name="paymentMethod2"
                value={paymentMethod2}
                checked={false}
                onChange={(e) => setPaymentMethod2(e.target.value)}
              ></Form.Check>
            </Col>
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default PaymentScreen;
