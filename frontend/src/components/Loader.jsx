import { Spinner } from "react-bootstrap";

const Loader = ({ width, height }) => {
  return (
    <Spinner
      animation="border"
      role="status"
      style={{
        color: "#78716c",
        width,
        height,
        margin: "auto",
        display: "block",
      }}
    />
  );
};

export default Loader;
