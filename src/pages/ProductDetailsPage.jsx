import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Spinner from "react-bootstrap/Spinner";
import "../styles/ProductDetailsPage.css";
import axios from "axios";
import EditProductModal from "../components/EditProductModal";

const ProductDetailsPage = ({
  formData,
  setFormData,
  handleFormChange,
  handleFormSubmit,
  addToCart,
}) => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProductDetails = async (productId) => {
      setLoading(true);
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${productId}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductDetails(productId);
    }
  }, [productId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`https://fakestoreapi.com/products/${productId}`);
      toast.success("Product deleted!");
      navigate("/products");
    } catch (err) {
      setError(err.message);
      toast.error("Failed to delete product!");
    }
  };

  const handleOpenModal = () => {
    setFormData({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
    });
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setFormData({
      title: product.title || "",
      price: product.price || "",
      description: product.description || "",
      category: product.category || "",
    });
    setShowModal(false);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-5 gap-2">
        <Spinner animation="border" />
        <span>Loading Product Details...</span>
      </div>
    );
  }

  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="product__container">
        <h1 className="product__title">{product.title}</h1>
        <img className="product__img" src={product.image} alt={product.title} />
        <p className="product__description">{product.description}</p>
        <p className="product__category">{product.category}</p>
        <div className="d-flex justify-content-between align-items-center mt-3">
          <p className="product__price mb-0">${product.price}</p>
          <div className="d-flex gap-3">
            <i
              className="bi bi-cart-plus"
              style={{ cursor: "pointer", fontSize: "1.6rem", color: "green" }}
              onClick={() => addToCart(product)}
            ></i>
            <i
              className="bi bi-pen"
              style={{ cursor: "pointer", fontSize: "1.6rem", color: "green" }}
              onClick={handleOpenModal}
            ></i>
            <i
              className="bi bi-trash"
              style={{ cursor: "pointer", fontSize: "1.6rem", color: "red" }}
              onClick={handleDelete}
            ></i>
          </div>
        </div>
      </div>
      {showModal && (
        <EditProductModal
          show={showModal}
          onHide={handleCloseModal}
          formData={formData}
          handleFormChange={handleFormChange}
          handleFormSubmit={handleFormSubmit}
        />
      )}
    </>
  );
};

export default ProductDetailsPage;
