import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
} from "../slices/productsApiSlice";
import FormContainer from "../components/FormContainer";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState("");

  const {
    data: product,
    isLoading: loadingProduct,
    error,
    refetch,
  } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] =
    useUpdateProductMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    const result = await updateProduct({
      productId,
      name,
      image,
      price,
      brand,
      category,
      countInStock,
      description,
    });

    if (result.error) {
      toast.error(result.error);
    } else {
      toast.success("Product update successful");
      navigate("/admin/product-list");
    }
  };

  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
        Go Back
      </Link>

      <FormContainer>
        <h1>Edit Product</h1>
        {loadingProduct ? (
          <Loader />
        ) : error ? (
          <Message variant="danger">{error}</Message>
        ) : (
          <div className="d-flex-column justify-content-center">
            <Form onSubmit={submitHandler}>
              <Form.Group controlId="name">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="update name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="update price"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="brand">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="update brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="cuntInStock">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="update count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="category">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="update category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  placeholder="update description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>

              <Button type="submit" variant="primary" className="my-2">
                Update
              </Button>
            </Form>
          </div>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
