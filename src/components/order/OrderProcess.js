import React, { useState } from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const OrderSummary = ({ cart, total, onPlaceOrder }) => {
    return (
      <>
        <h2>Order Summary</h2>
        {cart.map((ele) => (
          <ProductItem key={ele.product.productId}>
            <ProductImage src={ele.product.productImage} alt={ele.product.name} />
            <ProductDetails>
              <ProductName>{ele.product.productName}</ProductName>
              <ProductPrice>${ele.product.price}</ProductPrice>
            </ProductDetails>
          </ProductItem>
        ))}
        <TotalPrice>Total: ${total}</TotalPrice>
        <PlaceOrderButton onClick={onPlaceOrder}>Place Order</PlaceOrderButton>
      </>
    );
  };
  
  const ProductItem = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  `;
  
  const ProductImage = styled.img`
    width: 100px; /* Adjust the width as needed */
    height: 100px; /* Adjust the height as needed */
    margin-right: 10px;
  `;
  
  const ProductDetails = styled.div`
    display: flex;
    flex-direction: column;
  `;
  
  const ProductName = styled.p`
    margin: 0;
    font-weight: bold;
  `;
  
  const ProductPrice = styled.p`
    margin: 0;
  `;
  

const ShippingInformation = ({ onSubmitShipping }) => {
  const [address, setAddress] = useState('');
  const [contactNumber, setContactNumber] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitShipping({ address, contactNumber });
  };

  return (
    <>
      <h2>Shipping Information</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Address:
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required />
        </label>
        <label>
          Contact Number:
          <input type="tel" value={contactNumber} onChange={(e) => setContactNumber(e.target.value)} required />
        </label>
        <button type="submit">Continue to Payment</button>
      </form>
    </>
  );
};

const PaymentInformation = ({ onSubmitPayment }) => {
  // Add payment-related state and input fields as needed

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmitPayment(/* Add payment details here */);
  };

  return (
    <>
      <h2>Payment Information</h2>
      <form onSubmit={handleSubmit}>
        {/* Add payment input fields */}
        <button type="submit">Submit Payment</button>
      </form>
    </>
  );
};

const ConfirmationPage = ({ orderDetails }) => {
  return (
    <>
      <h2>Order Confirmation</h2>
      {/* Display order details */}
      <div>Order placed successfully!</div>
    </>
  );
};

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

const Checkout = () => {
  const [step, setStep] = useState(1);
  const [shippingDetails, setShippingDetails] = useState({});
  const [paymentDetails, setPaymentDetails] = useState({});
  const { state } = useCart();
  const { cart } = state;

  const handlePlaceOrder = () => {
    setStep(2);
  };

  const handleShippingSubmit = (shippingInfo) => {
    setShippingDetails(shippingInfo);
    setStep(3);
  };

  const handlePaymentSubmit = (paymentInfo) => {
    // Handle payment submission and order confirmation
    setPaymentDetails(paymentInfo);
    setStep(4);
  };
  const calculateTotalPrice = () => {
    return cart.reduce((total, product) => total + product.price, 0);
  };

  return (
    <>
      {step === 1 && <OrderSummary cart={cart} total={calculateTotalPrice()} onPlaceOrder={handlePlaceOrder} />}
      {step === 2 && <ShippingInformation onSubmitShipping={handleShippingSubmit} />}
      {step === 3 && <PaymentInformation onSubmitPayment={handlePaymentSubmit} />}
      {step === 4 && <ConfirmationPage orderDetails={{ shippingDetails, paymentDetails, cart }} />}
    </>
  );
};

export default Checkout;
