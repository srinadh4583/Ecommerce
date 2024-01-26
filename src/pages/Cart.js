// Cart.js
import { useEffect,React } from 'react';
import styled from 'styled-components';
import { useCart } from '../components/context/CartContext';
import { FaTrash } from 'react-icons/fa'; // Assuming you have FontAwesome icons installed
import { NavLink } from 'react-router-dom';
import CartEmptyMessage from '../components/Error/CartEmptyMessage';
import { GET_CART_ITEMS } from '../services/graphql';
import { useQuery } from '@apollo/client';
import Spinner from '../components/Spinner';
import SomeThingWentWrong from '../components/Error/SomeThingWentWrong';

const CartContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
`;

const CartItem = styled.div`
  background-color: #fff;
  border: 1px solid #ddd;
  padding: 15px;
  margin-bottom: 15px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  img {
    max-width: 100px;
    margin-right: 15px;
    border-radius: 5px;
  }

  div {
    flex: 1;
  }

  h3 {
    margin: 0;
    font-size: 1.5rem;
    color: #333;
  }

  p {
    margin: 5px 0;
    color: #666;
  }

  span {
    font-weight: bold;
    margin-left: auto;
  }

  button {
    background-color: #ff4500;
    color: #fff;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s ease-in-out;
  }

  button:hover {
    background-color: #d43900;
  }

  .remove-icon {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #999;
    font-size: 1.2rem;
    cursor: pointer;
    transition: color 0.3s ease-in-out;
  }

  .remove-icon:hover {
    color: #e74c3c;
  }
`;

const EmptyCartMessage = styled.p`
  text-align: center;
  color: #666;
`;
const TotalPrice = styled.div`
  margin-top: 20px;
  font-size: 1.2rem;
  font-weight: bold;
  text-align: right;
`;

const PlaceOrderButton = styled.button`
  margin-top: 10px;
  background-color: #4caf50;
  color: #fff;
  border: none;
  padding: 12px 20px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;

  &:hover {
    background-color: #45a049;
  }
`;

const Cart = () => {
  const { state, dispatch } = useCart();
  const { cart } = state;

  // Define the query hook
  const { loading, error, data } = useQuery(GET_CART_ITEMS, {
    variables: { userId: 1 }, // You may need to adjust this according to your authentication system
    fetchPolicy: 'cache-and-network', // Fetch data from cache if available, and then fetch from network for fresh data
  });

  // Use useEffect to update cart state when data changes
  useEffect(() => {
    if (data && data.getCartItems) {
      dispatch({
        type: 'SET_CART',
        payload: { cart: data.getCartItems }, // Assuming your server returns the cart items
      });
    }
  }, [data, dispatch]);

  const handleRemoveFromCart = (productId) => {
    // Dispatch the REMOVE_FROM_CART action to update the cart state
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: { productId },
    });
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      {loading && <Spinner/>}
      {error && <SomeThingWentWrong/>}
      {!loading && !error && cart.length === 0 && (
        <EmptyCartMessage>
          <CartEmptyMessage />
        </EmptyCartMessage>
      )}
      {!loading && !error && cart.length > 0 && (
        <div>
          {cart.map((product) => (
            <CartItem key={product.cartItemId}>
              <img src={product.product.productImage} alt={product.product.productName} />
              <div>
                <h3>{product.product.productName}</h3>
                <p>{product.product.description}</p>
                <p>${product.product.price}</p>
              </div>
              <span>Quantity: {product.quantity}</span>
              <FaTrash className="remove-icon" onClick={() => handleRemoveFromCart(product.product.productId)} />
            </CartItem>
          ))}
          <TotalPrice>Total: ${calculateTotalPrice()}</TotalPrice>
          <NavLink to='/placeorder'>
            <PlaceOrderButton >Place Order</PlaceOrderButton>
          </NavLink>
        </div>
      )}
    </CartContainer>
  );
};

export default Cart;

