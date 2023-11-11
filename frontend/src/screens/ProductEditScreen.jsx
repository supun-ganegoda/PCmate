import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from "../slices/productsApiSlice";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Button, Col, Form, Row } from "react-bootstrap";
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
  } = useGetProductDetailsQuery(productId);
  const [updateProduct] = useUpdateProductMutation();

  const [uploadProductImage, { isLoading: uploadingImage }] =
    useUploadProductImageMutation();

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

  const imageUploadHandler = async (e) => {
    const formData = new FormData();
    formData.append("image", e.target.files[0]);

    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.image);
    } catch (error) {
      toast.error(error?.data?.message || error.error);
    }
  };

  return (
    <>
      <Link to="/admin/product-list" className="btn btn-light my-3">
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
        <h1>Edit Product</h1>
        {loadingProduct ? (
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

              <Form.Group controlId="price" className="my-2">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="update price"
                  value={price.toFixed(2)}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="image" className="my-2">
                <Row>
                  <Col className="col-9">
                    <Form.Label>Product Image</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="image url"
                      value={image}
                      onChange={(e) => setImage(e.target.value)}
                    />
                  </Col>
                  {uploadingImage && (
                    <Col className="d-flex align-items-center">
                      <Loader />
                    </Col>
                  )}
                </Row>
                <Row>
                  <Col>
                    <Form.Control
                      className="my-2"
                      type="file"
                      Label="choose file"
                      onChange={imageUploadHandler}
                    />
                  </Col>
                </Row>
              </Form.Group>

              <Form.Group controlId="brand" className="my-2">
                <Form.Label>Brand</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="update brand"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="cuntInStock" className="my-2">
                <Form.Label>Count In Stock</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="update count in stock"
                  value={countInStock}
                  onChange={(e) => setCountInStock(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="category" className="my-2">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="update category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>

              <Form.Group controlId="description" className="my-2">
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
      </div>
    </>
  );
};

export default ProductEditScreen;
