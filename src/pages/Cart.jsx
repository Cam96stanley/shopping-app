import "../styles/cart.css";

const Cart = ({ cart, decreaseQuantity, increaseQuantity, removeFromCart }) => {
  const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
      {/* Table for desktop */}

      <div className="cart-table d-none d-md-block">
        <div className="table-responsive">
          <table className="table table-striped table-hover">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.length > 0 ? (
                <>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>{item.title}</td>
                      <td>${item.price}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-outline-secondary me-2"
                          onClick={() => decreaseQuantity(item.id)}
                        >
                          -
                        </button>
                        {item.quantity}
                        <button
                          className="btn btn-sm btn-outline-secondary ms-2"
                          onClick={() => increaseQuantity(item.id)}
                        >
                          +
                        </button>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => removeFromCart(item.id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td colSpan="2"></td>
                    <td className="fw-bold">Total:</td>
                    <td className="fw-bold">${total.toFixed(2)}</td>
                  </tr>
                </>
              ) : (
                <tr>
                  <td colSpan="4" className="text-center">
                    Cart is empty
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Cards for mobile */}

      <div className="cart-cards d-block d-md-none">
        {cart.length > 0 ? (
          <>
            {cart.map((item) => (
              <div className="cart-card" key={item.id}>
                <h5>{item.title}</h5>
                <p>
                  <strong>Price:</strong> ${item.price}
                </p>
                <p>
                  <strong>Quantity:</strong>
                  <button
                    className="btn btn-sm btn-outline-secondary me-2 ms-2"
                    onClick={() => decreaseQuantity(item.id)}
                  >
                    -
                  </button>
                  {item.quantity}
                  <button
                    className="btn btn-sm btn-outline-secondary ms-2"
                    onClick={() => increaseQuantity(item.id)}
                  >
                    +
                  </button>
                </p>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => removeFromCart(item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
            <div className="total-box mt-3">
              <h6>Total: ${total.toFixed(2)}</h6>
            </div>
          </>
        ) : (
          <p className="text-center">Cart is empty</p>
        )}
      </div>
    </>
  );
};

export default Cart;
