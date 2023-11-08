import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import {
  useGetUserQuery,
  useUpdateUserMutation,
} from "../slices/usersApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const UserEditScreen = () => {
  const { id: userId } = useParams();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);

  const {
    data: user,
    isLoading: loadingUsers,
    error,
  } = useGetUserQuery(userId);

  const [updateUser] = useUpdateUserMutation();

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
      setIsAdmin(user.isAdmin);
    }
  }, [user]);

  const handleConfirmation = () => {
    if (!isAdmin) {
      if (window.confirm("Do you want to grant admin priviledges?")) {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } else setIsAdmin(false);
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateUser({
        _id: userId,
        name,
        email,
        isAdmin,
      }).unwrap();
      toast.success("User update success");
      navigate("/admin/user-list");
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/user-list" className="btn btn-light my-3">
        Go Back
      </Link>

      <div
        className="container mx-auto p-4"
        style={{
          width: "80%",
          backgroundColor: "#f5f5f4",
          borderRadius: "12px",
        }}
      >
        <h1>Edit User</h1>
        {loadingUsers ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="d-flex-column justify-content-center">
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name" className="my-2">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="update name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="email" className="my-2">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="update email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="isAdmin" className="my-2">
                <Form.Check
                  type="checkbox"
                  label="Is Admin"
                  checked={isAdmin}
                  onChange={handleConfirmation}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </div>
        )}
      </div>
    </>
  );
};

export default UserEditScreen;
