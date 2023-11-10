import { Col, Row, Table } from "react-bootstrap";
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import Paginate from "../components/Paginate";
import { toast } from "react-toastify";
import {
  useDeleteUserMutation,
  useGetUsersQuery,
} from "../slices/usersApiSlice";
import { useParams } from "react-router-dom";

const UserListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetUsersQuery({ pageNumber });
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (userId) => {
    if (window.confirm("Are you sure ?")) {
      try {
        const res = await deleteUser(userId).unwrap();
        toast.success(res.message);
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Users</h1>
        </Col>
      </Row>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error}</Message>
      ) : (
        <>
          <Table striped hover responsive className="table-sm">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Admin</th>
              </tr>
            </thead>
            <tbody>
              {data.users.map((user, index) => (
                <tr key={index}>
                  <td>{user._id}</td>
                  <td>{user.name}</td>
                  <td>
                    <a href={`mailto:${user.email}`}>{user.email}</a>
                  </td>
                  <td>
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-2">
                    <LinkContainer to={`/admin/user/${user._id}/edit`}>
                      <FaEdit role="button" />
                    </LinkContainer>
                  </td>
                  <td className="px-2">
                    {loadingDelete ? (
                      <Loader />
                    ) : (
                      <FaTrash
                        style={{ color: "red" }}
                        role="button"
                        onClick={() => deleteHandler(user._id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row>
            <Col className="d-flex justify-content-center align-items-center pt-4">
              <Paginate
                pages={data.pages}
                page={data.page}
                isAdmin={true}
                dashBoard="user-list"
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default UserListScreen;
