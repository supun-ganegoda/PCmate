import { Container, Image } from "react-bootstrap";

const NotFound = () => {
  return (
    <div className="d-flex m-auto">
      <Container className="text-center">
        <Image
          className="mx-auto p-auto"
          src="/images/logo_light.png"
          alt="PCmate logo"
          fluid
        />
        <h1 className="text-center">404 Not Found</h1>
      </Container>
    </div>
  );
};

export default NotFound;
