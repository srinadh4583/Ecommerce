// ProductCard.js

import React from 'react';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const CardContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
  width: 200px; /* Set a fixed width for each product card */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  &:hover {
    box-shadow: 0 0 15px rgba(0, 0, 0, 0.2);
  }
`;

const ProductImage = styled.img`
  width: 100%;
  max-height: 200px;
  object-fit: cover;
  border-radius: 5px;
`;

const ProductName = styled.h4`
  margin-top: 3px;
  
  color: #333;
`;

const ProductDescription = styled.p`
  margin-top: 3px;
  font-size: 1rem;
  color: #666;
`;

const ProductPrice = styled.p`
  margin-top: 3px;
  font-size: 1.2rem;
  color: #333;
  font-weight: bold;
`;
const AddToCartButton = styled.button`
  margin-top: 10px;
  padding: 8px 16px;
  font-size: 1rem;
  background-color: #ff4500;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const ProductCard = ({ product }) => {
  const { dispatch } = useCart();

  const handleAddToCart = () => {
    // Dispatch the ADD_TO_CART action to update the cart state
    dispatch({
      type: 'ADD_TO_CART',
      payload: { product },
    });
  };
  return (
    <CardContainer>
      <ProductImage src={product.productImage} alt={product.productName} />
      <ProductName>{product.productName}</ProductName>
      <ProductDescription>{product.description}</ProductDescription>
      <ProductPrice>${product.price}</ProductPrice>
      <AddToCartButton onClick={handleAddToCart}>Add to Cart</AddToCartButton>
    </CardContainer>
  );
};

export default ProductCard;
