import {
  useCreateProductMutation,
  useGetProductsQuery,
  useDeleteProductMutation,
} from "../slices/productsApiSlice";
import { Button, Col, Row, Table } from "react-bootstrap";
import { FaEdit, FaTrash } from "react-icons/fa";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { LinkContainer } from "react-router-bootstrap";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

const ProductListScreen = () => {
  const { pageNumber } = useParams();
  const { data, isLoading, error, refetch } = useGetProductsQuery({
    pageNumber,
  });
  const [createProduct, { isLoading: loadingCreate }] =
    useCreateProductMutation();
  const [deleteProduct, { isLoading: loadingDelete }] =
    useDeleteProductMutation();

  const deleteHandler = async (productId) => {
    if (window.confirm("Are you sure ?")) {
      try {
        const res = await deleteProduct(productId).unwrap();
        toast.success(res.message);
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm("Are you sure to create new Product")) {
      try {
        await createProduct();
        refetch();
      } catch (error) {
        toast.error(error?.data?.message || error.error);
      }
    }
  };

  return (
    <>
      <Row className="align-items-center">
        <Col>
          <h1>Products</h1>
        </Col>
        <Col className="text-end">
          {loadingCreate ? (
            <Loader />
          ) : (
            <Button className="btn-sm m-3" onClick={createProductHandler}>
              <FaEdit className="mx-2" />
              Create Product
            </Button>
          )}
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
                <th>Price</th>
                <th>Category</th>
                <th>Brand</th>
              </tr>
            </thead>
            <tbody>
              {data.products.map((product, index) => (
                <tr key={index}>
                  <td>{product._id}</td>
                  <td>{product.name}</td>
                  <td>Rs. {product.price}</td>
                  <td>{product.category}</td>
                  <td>{product.brand}</td>
                  <td className="px-2">
                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
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
                        onClick={() => deleteHandler(product._id)}
                      />
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>

          <Row>
            <Col className="d-flex justify-content-center pt-2 mt-1">
              <Paginate
                page={data.page}
                pages={data.pages}
                isAdmin={true}
                dashBoard="product-list"
              />
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductListScreen;
