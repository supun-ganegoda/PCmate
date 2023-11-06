import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { useProfileMutation } from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import { toast } from "react-toastify";
import { setCredentials } from "../slices/authSlice";
import { useGetMyOrdersQuery } from "../slices/orderApiSlice";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";
import { LinkContainer } from "react-router-bootstrap";

const ProfileScreen = () => {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading: loadingProfile }] = useProfileMutation();
  const { data: orders, isLoading, error } = useGetMyOrdersQuery();

  useEffect(() => {
    if (userInfo) {
      setName(userInfo.name);
      setEmail(userInfo.email);
    }
  }, [userInfo.name, userInfo.email]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      try {
        const res = await updateProfile({
          _id: userInfo._id,
          name,
          email,
          password,
        }).unwrap();
        dispatch(setCredentials(res));
        toast.success("Profile updated successfully");
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    } else {
      toast.error("Passwords not matching");
    }
  };

  return (
    <Row>
      <Col md={3}>
        <h2>User Profile</h2>

        <Form onSubmit={submitHandler}>
          <Form.Group controlId="name" className="my-2">
            <Form.Label>User Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="enter new name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="email" className="my-2">
            <Form.Label>Email Address</Form.Label>
            <Form.Control
              type="email"
              placeholder="enter new email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="password" className="my-2">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="enter new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="confirmPassword" className="my-2">
            <Form.Label>Confirm New Password</Form.Label>
            <Form.Control
              type="passowrd"
              placeholder="confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>

          <div className="d-flex align-items-center">
            <Button type="submit" variant="primary" className="my-2">
              Update Profile
            </Button>
            {loadingProfile && <Loader />}
          </div>
        </Form>
      </Col>

      <Col md={9}>
        <h2>My Orders</h2>
        {isLoading ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">
            {error?.data?.message || error.error}
          </Message>
        ) : (
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Date</th>
                <th>Total</th>
                <th>Paid</th>
                <th>Delivered</th>
              </tr>
            </thead>

            <tbody>
              {orders.map((order, index) => (
                <tr key={index}>
                  <td>{order._id.substring(0, 10)}...</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>Rs. {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                      order.paidAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      order.deliveredAt.substring(0, 10)
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button className="btn-sm" variant="light">
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Col>
    </Row>
  );
};

export default ProfileScreen;
