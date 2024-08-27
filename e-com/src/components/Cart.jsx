import './Cart.css'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem, addItem, clearCart } from '../utilities/cartSlice';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);

  const user = localStorage.getItem('user')

  const handleRemoveItem = (item) => {
    console.log(item)
    dispatch(removeItem(item))
  }

  const handleAddItem = (item) => {
    dispatch(addItem(item))
    console.log(item)
  }


  const baseShippingCost = 5;
  // Determine shipping cost based on whether there are items in the cart
  const shippingCost = cartItems.length === 0 ? 0 : baseShippingCost;

  const calculateTotalCost = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  // Calculate the total cost
  const totalCost = calculateTotalCost();
  const totalWithShipping = totalCost + shippingCost;

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert('Your cart is empty. Add items to your cart before checking out.');
      return;
    }
    if (!user) {
      alert('You must be logged in to proceed to checkout.');
      navigate('/login'); // Redirect to login page if not logged in
      return;
    }
    dispatch(clearCart());
    // Navigate to checkout page with cart details
    navigate('/checkout', { state: { cartItems, totalCost, totalWithShipping } });
  };

  return (
    <div className="parent">
      <div className="child">
        <h1 className="h1">Items in Cart</h1>
        {cartItems.length === 0 ? (
          <h3>Your cart is empty</h3>
        ) : (
          <>
            <div className='cart-items-container'>
              {cartItems.map((product) => (
                <div className="card m-2" key={product._id}>
                  <img className="card-img-top" src={`http://localhost:5000/uploads/${product.image}`} alt="Card image cap" />
                  <div className="card-body d-flex flex-column">
                    <Link to={`/product/${product.id}`}>
                      <h5 className="card-title">{product.name}</h5>
                    </Link>
                    <h6 className="card-title">Price: {product.price}</h6>
                    <h6 className="card-title">Ratings: {product.avgRating}</h6>
                    <p className="card-text">{product.description}</p>
                    <div>
                      <button className=" mt-auto cart-button me-2 fw-bold" onClick={() => handleRemoveItem(product)}><i className="fa-solid fa-cart-shopping">-</i></button>
                      <span>{product.quantity}</span>
                      <button className=" mt-auto cart-button ms-2 fw-bold" onClick={() => handleAddItem(product)}><i className="fa-solid fa-cart-shopping">+</i></button>
                    </div>
                  </div>
                </div>)
              )
              }
            </div>
          </>)}
      </div>
      <div className="child">
        <h1 className="h1">Summary</h1>
        <div className="summary">
          <p>Cost</p>
          <p>${totalCost}</p>
        </div>
        <div className="summary">
          <p>Shipping</p>
          <p>${shippingCost}</p>
        </div>
        <hr />
        <div className="summary">
          <p><strong>Total</strong></p>
          <p><strong>${totalWithShipping}</strong></p>
        </div>
        <div><button type="button" className="buton" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  )
}

export default Cart