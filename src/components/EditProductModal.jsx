import ProductForm from "./ProductForm";
import { Modal } from "react-bootstrap";

const EditProductModal = ({
  show,
  onHide,
  formData,
  handleFormChange,
  handleFormSubmit,
}) => {
  return (
    <>
      <Modal show={show} onHide={onHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ProductForm
            formData={formData}
            handleFormChange={handleFormChange}
            handleFormSubmit={handleFormSubmit}
          />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditProductModal;
