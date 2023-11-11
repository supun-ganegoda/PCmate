import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";

const Search = () => {
  const navigate = useNavigate();
  const { keyword: key } = useParams();
  const [keyWord, setKeyWord] = useState(key || "");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyWord.trim()) {
      setKeyWord("");
      navigate(`/search/${keyWord}`);
    } else {
      navigate("/");
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <Form.Control
        type="text"
        name="q"
        value={keyWord}
        placeholder="search products..."
        className="mr-sm-2 ml-sm-5"
        onChange={(e) => setKeyWord(e.target.value)}
      ></Form.Control>
      <Button type="submit" variant="outline-light" className="py-1 mx-2">
        <FaSearch />
      </Button>
    </Form>
  );
};

export default Search;
