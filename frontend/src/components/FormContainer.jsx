import { Container, Row, Col } from "react-bootstrap";
import styles from "./FormContainer.module.scss";

const FormContainer = ({ children }) => {
  return (
    <Container className={styles.container}>
      <Row className="justify-content">
        <Col xs={12} md={6}>
          {children}
        </Col>
      </Row>
    </Container>
  );
};

export default FormContainer;
