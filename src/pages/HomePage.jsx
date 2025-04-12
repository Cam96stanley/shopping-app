import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Carousel from "react-bootstrap/Carousel";
import "../styles/homepage.css";

import { Link } from "react-router-dom";

const HomePage = ({ images }) => {
  return (
    <Container className="min-vh-100 d-flex align-items-start justify-content-center pt-5">
      <Row>
        <Col className="text-center">
          <h1 className="title">Welcome to DevMart</h1>
          <p></p>
          <Carousel>
            {images.length > 0 &&
              images.map((image, index) => (
                <Carousel.Item key={index}>
                  <img className="d-block w-100 carousel" src={image} />
                </Carousel.Item>
              ))}
          </Carousel>
          <p className="mt-5 lead text-muted">
            Explore a wide variety of products picked just for you!
          </p>
          <Button as={Link} to="/products" className="btn px-4 py-2">
            Products
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default HomePage;
