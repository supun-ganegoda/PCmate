import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        color: "#78716c",
        width: "100px",
        height: "100px",
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
