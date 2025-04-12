import { Form, Button, InputGroup } from "react-bootstrap";

const ProductForm = ({ handleFormChange, handleFormSubmit, formData }) => {
  return (
    <>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group controlId="formTitle" className="mb-3">
          <Form.Label>Product Title</Form.Label>
          <Form.Control
            name="title"
            type="text"
            placeholder="Asus Desktop Monitor"
            onChange={handleFormChange}
            value={formData.title}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPrice" className="mb-3">
          <Form.Label>Product Price</Form.Label>
          <InputGroup>
            <InputGroup.Text>$</InputGroup.Text>
            <Form.Control
              name="price"
              type="number"
              min={1}
              step="0.01"
              placeholder="19.99"
              onChange={handleFormChange}
              value={formData.price}
              required
            />
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="formDescription" className="mb-3">
          <Form.Label>Product Description</Form.Label>
          <Form.Control
            name="description"
            as="textarea"
            rows={3}
            placeholder="24-inch Full HD display with HDMI & VGA ports"
            onChange={handleFormChange}
            value={formData.description}
            required
          />
        </Form.Group>

        <Form.Group controlId="formCategory" className="mb-4">
          <Form.Label>Product Category</Form.Label>
          <Form.Select
            name="category"
            style={{ cursor: "pointer" }}
            onChange={handleFormChange}
            value={formData.category}
            required
          >
            <option value="">Select a Category</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
            <option value="jewelery">Jewelery</option>
            <option value="electronics">Electronics</option>
          </Form.Select>
        </Form.Group>

        <div className="text-center">
          <Button variant="primary" type="submit">
            Submit
          </Button>
        </div>
      </Form>
    </>
  );
};

export default ProductForm;
