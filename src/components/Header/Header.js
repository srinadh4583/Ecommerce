// Header.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import { IoMdCart } from 'react-icons/io';
import NavBar from './NavBar';
import styled from 'styled-components';
import { useCart } from '../context/CartContext';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  background-color: #f0f0f0;
  position:sticky;
  top:0;
`;

const CartIcon = styled(NavLink)`
  font-size: 24px;
  margin-left: 20px;
  text-decoration: none;
  color: black;
  font-weight: bold;
  position: relative;

  &:hover {
    color: coral;
  }

  &.active {
    color: deepskyblue;
  }
`;

const CartQuantity = styled.span`
  position: absolute;
  top: -12px;
  right: -5px;
  background-color: red;
  color: white;
  border-radius: 50%;
  padding: 2px;
  font-size: 12px;
`;

const Header = () => {
  const { state } = useCart();
const { cartQuantity } = state;
  return (
    <HeaderContainer>
      <img src="logo.png" alt="Store Logo" />
      <NavBar />
      <CartIcon to="/cart" className={({ isActive }) => isActive? "active": ''}>
        <IoMdCart />
        {cartQuantity !== undefined && <CartQuantity>{cartQuantity}</CartQuantity>}
    
      </CartIcon>
    </HeaderContainer>
  );
};

export default Header;
