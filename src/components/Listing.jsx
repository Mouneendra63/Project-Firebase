import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ Import useNavigate
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useFirebase } from "../context/firebase";

function Listing() {
  const firebase = useFirebase();
  const navigate = useNavigate(); // ✅ Hook correctly called in component body

  const [name, setName] = useState("");
  const [isbnNumber, setIsbnNumber] = useState("");
  const [price, setPrice] = useState("");
  const [story, setStory] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!name || !isbnNumber || !price || !story) {
      setError("All fields are required.");
      return;
    }

    try {
      const res = await firebase.addListing(name, isbnNumber, price, story);
      if (res) {
        navigate("/"); // ✅ Navigating only when res is valid
      }
      setSuccess("Book added successfully!");
      setName("");
      setIsbnNumber("");
      setPrice("");
      setStory("");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="container">
      <div className="container mb-4 mt-3">
        <h1>Add Your Book</h1>
      </div>
      <Form className="ms-3 mb-3" onSubmit={handleSubmit}>
        {error && <p style={{ color: "red" }}>{error}</p>}
        {success && <p style={{ color: "green" }}>{success}</p>}

        <Form.Group className="mb-3 mt-5" controlId="formBasicBookName">
          <Form.Label>Book Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Book Name"
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicISBN">
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            placeholder="Book Number"
            onChange={(e) => setIsbnNumber(e.target.value)}
            value={isbnNumber}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPrice">
          <Form.Label>Price</Form.Label>
          <Form.Control
            type="text"
            placeholder="Set Price"
            onChange={(e) => setPrice(e.target.value)}
            value={price}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicGenre">
          <Form.Label>Genre of Story</Form.Label>
          <Form.Control
            type="text"
            placeholder="Genre"
            onChange={(e) => setStory(e.target.value)}
            value={story}
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
}

export default Listing;