import { Row, Col, Button } from "react-bootstrap";
import { useGetProductsQuery } from "../slices/productsApiSlice";
import Product from "../components/Product";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { Link, useParams } from "react-router-dom";
import Paginate from "../components/Paginate";

function HomeScreen() {
  const { pageNumber, keyword } = useParams();
  const { data, isLoading, error } = useGetProductsQuery({
    keyword,
    pageNumber,
  });

  return (
    <>
      {isLoading ? (
        <>
          <Loader width={"100px"} height={"100px"} />
        </>
      ) : error ? (
        <>
          <Message variant={"danger"}>
            {error?.data?.message || error.error}
          </Message>
        </>
      ) : (
        <>
          {keyword && (
            <Link to="/">
              <Button variant="light" className="mb-2">
                Go Back
              </Button>
            </Link>
          )}
          <h1>Latest Products</h1>
          <Row>
            {data.products.length === 0 && (
              <Message>No matching products</Message>
            )}
            {data.products.map((product) => {
              return (
                <Col sm={12} md={6} lg={4} xl={3} key={product._id}>
                  <Product product={product} />
                </Col>
              );
            })}
          </Row>
          <Row>
            <Col className="d-flex justify-content-center align-items-center pt-4">
              <Paginate pages={data.pages} page={data.page} keyword={keyword} />
            </Col>
          </Row>
        </>
      )}
    </>
  );
}

export default HomeScreen;
