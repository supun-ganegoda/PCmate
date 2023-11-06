import { useGetOrdersQuery } from "../slices/orderApiSlice";
import Loader from "../components/Loader";
import { Button, Table } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../components/Message";
import { FaTimes } from "react-icons/fa";

const OrderListScreen = () => {
  const { data: orders, isLoading, error } = useGetOrdersQuery();

  return (
    <>
      <h1>Orders List</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message varient="danger">
          {error?.data?.message || error.error}
        </Message>
      ) : (
        <Table striped hover responsive className="table-sm">
          <thead>
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Date</th>
              <th>Total</th>
              <th>Paid</th>
              <th>Delivered</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order, index) => (
              <tr key={index}>
                <td>{order._id}</td>
                <td>{order.user.name}</td>
                <td>{order.createdAt.substring(0, 10)}</td>
                <td>Rs. {order.totalPrice}</td>
                <td>
                  {!order.isPaid ? (
                    <FaTimes style={{ color: "red" }} />
                  ) : (
                    order.paidAt.substring(0, 10)
                  )}{" "}
                </td>
                <td>
                  {!order.isDelivered ? (
                    <FaTimes style={{ color: "red" }} />
                  ) : (
                    order.deliveredAt.substring(0, 10)
                  )}{" "}
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
    </>
  );
};

export default OrderListScreen;
