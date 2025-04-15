import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import "../styles/productListingPage.css";

const ProductListingPage = ({ products, loading, error, addToCart }) => {
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5 gap-2">
        <Spinner animation="border" />
        <span>Loading Products...</span>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <div className="card__container">
      {products.length > 0 &&
        products.map((product) => (
          <Card className="card" key={product.id}>
            <Card.Img
              className="product__img"
              variant="top"
              src={product.image}
            />
            <Card.Body className="card__body">
              <Card.Title>{product.title}</Card.Title>
              <Card.Text className="product__price">${product.price}</Card.Text>
              <div className="btn__container">
                <Button as={Link} to={`/products/${product.id}`}>
                  Details
                </Button>
                <i
                  className="bi bi-cart-plus"
                  style={{
                    cursor: "pointer",
                    fontSize: "1.6rem",
                    marginTop: "1rem",
                    color: "green",
                  }}
                  onClick={() => addToCart(product)}
                ></i>
              </div>
            </Card.Body>
          </Card>
        ))}
    </div>
  );
};

export default ProductListingPage;
