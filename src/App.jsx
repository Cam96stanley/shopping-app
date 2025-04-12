import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AddProductPage from "./pages/AddProductPage";
import { ToastContainer, toast } from "react-toastify";
function App() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    description: "",
    category: "",
  });

  const navigate = useNavigate();

  const handleFormChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevData) => {
      return {
        ...prevData,
        [name]: name === "price" ? parseFloat(value) || "" : value,
      };
    });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const pathname = window.location.pathname;
    const isEditMode = pathname.includes("/products/");

    const url = isEditMode
      ? `https://fakestoreapi.com/products/${pathname.split("/").pop()}`
      : "https://fakestoreapi.com/products";

    try {
      if (isEditMode) {
        await axios.put(url, formData);
        toast.success("Product Updated!");
      } else {
        await axios.post(url, formData);
        toast.success("Product Added!");
      }
      navigate("/products");
      setFormData({
        title: "",
        price: "",
        description: "",
        category: "",
      });
    } catch (err) {
      setError(err.message);
      toast.error(
        isEditMode ? "Failed to update product!" : "Failed to add product!"
      );
    }
  };

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((response) => {
        const images = response.data.map((item) => item.image);
        setImages(images);
        setProducts(response.data);
        setError(null);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <Routes>
        <Route path="/" element={<NavBar />}>
          <Route index element={<HomePage images={images} />} />
          <Route
            path="/products"
            element={
              <ProductListingPage
                products={products}
                loading={loading}
                error={error}
              />
            }
          />
          <Route
            path="/products/:productId"
            element={
              <ProductDetailsPage
                formData={formData}
                setFormData={setFormData}
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
              />
            }
          />
          <Route
            path="/add-products"
            element={
              <AddProductPage
                handleFormChange={handleFormChange}
                handleFormSubmit={handleFormSubmit}
                formData={formData}
              />
            }
          />
        </Route>
      </Routes>
      <ToastContainer position="top-left" autoClose={2000} />
    </>
  );
}

export default App;
