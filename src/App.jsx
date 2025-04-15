import { Routes, Route, useNavigate } from "react-router-dom";
import NavBar from "./components/NavBar";
import HomePage from "./pages/HomePage";
import { useEffect, useState } from "react";
import axios from "axios";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import AddProductPage from "./pages/AddProductPage";
import Cart from "./pages/Cart";
import { ToastContainer, toast } from "react-toastify";

function App() {
  const [products, setProducts] = useState([]);
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [cart, setCart] = useState([]);
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

  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (existingItem) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    toast.success(`${product.title} added to cart!`);
  };

  const increaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQuantity = (productId) => {
    setCart((prevCart) =>
      prevCart
        .map((item) =>
          item.id === productId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    toast.info("Item removed from cart");
  };

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
                addToCart={addToCart}
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
                addToCart={addToCart}
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
          <Route
            path="/cart"
            element={
              <Cart
                cart={cart}
                setCart={setCart}
                increaseQuantity={increaseQuantity}
                decreaseQuantity={decreaseQuantity}
                removeFromCart={removeFromCart}
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
