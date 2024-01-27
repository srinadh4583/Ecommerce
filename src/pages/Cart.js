// Cart.js
import { useEffect,React } from 'react';
import styled from 'styled-components';
import { useCart } from '../components/context/CartContext';
import { FaTrash } from 'react-icons/fa'; // Assuming you have FontAwesome icons installed
import { NavLink } from 'react-router-dom';
import CartEmptyMessage from '../components/Error/CartEmptyMessage';
import { GET_CART_ITEMS,DELETE_CART_ITEM } from '../services/graphql';
import { useQuery,useMutation } from '@apollo/client';
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
  const { cart, user } = state;

  const { loading, error, data, refetch } = useQuery(GET_CART_ITEMS, {
    variables: { userId: user.userId },
    fetchPolicy: 'cache-and-network',
  });

  const [deleteCartItem] = useMutation(DELETE_CART_ITEM);

  useEffect(() => {
    if (data && data.getCartItems) {
      dispatch({
        type: 'SET_CART',
        payload: { cart: data.getCartItems },
      });
    }
  }, [data, dispatch]);

  const handleRemoveFromCart = async (cartItemId) => {
    try {
      await deleteCartItem({
        variables: { cartItemId: cartItemId }
      });
      // Refetch cart items after successful removal
      refetch();
    } catch (error) {
      console.error('Error removing item from cart:', error);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => {
      const productPrice = parseFloat(product.product.price);
      if (!isNaN(productPrice)) {
        return total + productPrice;
      } else {
        console.error(`Invalid price found for product: ${product.product.productName}`);
        return total;
      }
    }, 0);
  };

  return (
    <CartContainer>
      <h2>Shopping Cart</h2>
      {loading && <Spinner />}
      {error && <SomeThingWentWrong />}
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
              <FaTrash className="remove-icon" onClick={() => handleRemoveFromCart(product.cartItemId)} />
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

