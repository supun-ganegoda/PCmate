import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { saveShippingAddress } from "../slices/cartSlice";
import CheckoutSteps from "../components/CheckoutSteps";

const ShippingScreen = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { shippingAddress } = useSelector((state) => state.cart);

  const [address, setAddress] = useState("" || shippingAddress?.address);
  const [city, setCity] = useState("" || shippingAddress?.city);
  const [postalCode, setPostalCode] = useState(
    "" || shippingAddress?.postalCode
  );
  const [country, setCountry] = useState("" || shippingAddress?.country);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <>
      <CheckoutSteps step1 step2 index={2} />
      <FormContainer>
        <h1>Shipping Details</h1>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="address" className="my-2">
            <Form.Label>Address line 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter address line1"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="City" className="my-2">
            <Form.Label>City</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="postal" className="my-2">
            <Form.Label>Postal Code</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter address line1"
              value={postalCode}
              onChange={(e) => setPostalCode(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="country" className="my-2">
            <Form.Label>Country</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </Form.Group>

          <Button type="submit" variant="primary" className="my-2">
            Continue
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default ShippingScreen;
