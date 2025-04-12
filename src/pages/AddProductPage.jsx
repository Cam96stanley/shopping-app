import ProductForm from "../components/ProductForm";

const AddProductPage = ({
  handleFormChange,
  handleFormSubmit,
  formData,
  error,
}) => {
  if (error) return <p>{error}</p>;

  return (
    <div
      className="container mt-5 p-4 shadow rounded bg-light"
      style={{ maxWidth: "600px" }}
    >
      <h2 className="mb-4 text-center">Add a New Product</h2>
      <ProductForm
        handleFormChange={handleFormChange}
        handleFormSubmit={handleFormSubmit}
        formData={formData}
      />
    </div>
  );
};

export default AddProductPage;
