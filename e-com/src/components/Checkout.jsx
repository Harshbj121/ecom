import './Checkout.css'
import { useLocation } from 'react-router-dom';

const Checkout = () => {
  const location = useLocation();
  const { cartItems, totalCost, totalWithShipping } = location.state || {};

  const handlePayment = (event) => {
    event.preventDefault();
    // Implement payment logic here (e.g., integration with payment gateway)
    alert('Payment processing...');
  };

  return (
    <div className="checkout-container">
      <h1>Checkout</h1>
      <div className="cart-summary">
        <h2>Order Summary</h2>
        <ul>
          {cartItems && cartItems.map((item) => (
            <li key={item._id}>
              {item.name} - {item.quantity} x ${item.price}
            </li>
          ))}
        </ul>
        <div className="summary">
          <p>Subtotal: ${totalCost}</p>
          <p>Shipping: ${5}</p>
          <p><strong>Total: ${totalWithShipping}</strong></p>
        </div>
      </div>
      <form onSubmit={handlePayment}>
        <h2>Payment Details</h2>
        <div>
          <label>
            Name on Card:
            <input type="text" required />
          </label>
        </div>
        <div>
          <label>
            Card Number:
            <input type="text" required />
          </label>
        </div>
        <div>
          <label>
            Expiry Date:
            <input type="text" required />
          </label>
        </div>
        <div>
          <label>
            CVV:
            <input type="text" required />
          </label>
        </div>
        <button type="submit">Pay ${totalWithShipping}</button>
      </form>
    </div>
  );
};

export default Checkout;
