// Navigation.js
import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const NavigationContainer = styled.nav`
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
  }
`;

const NavigationItem = styled.li`
  margin-right: 20px;

  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

const NavigationLink = styled(NavLink)`
  text-decoration: none;
  color: black;
  font-weight: bold;

  &:hover {
    color: coral;
  }

  &.active {
    color: deepskyblue;
  }
`;

const NavBar = () => {
  return (
    <NavigationContainer>
      <NavigationItem>
        <NavigationLink to="/home"  className={({ isActive }) => isActive? "active": ''}>
          Home
        </NavigationLink>
      </NavigationItem>
      <NavigationItem>
        <NavigationLink to="/about" className={({ isActive }) => isActive? "active": ''}>
          About
        </NavigationLink>
      </NavigationItem>
      <NavigationItem>
        <NavigationLink to="/products" className={({ isActive }) => isActive? "active": ''}>
          Products
        </NavigationLink>
      </NavigationItem>
      <NavigationItem>
        <NavigationLink to="/orders" className={({ isActive }) => isActive? "active": ''}>
          Orders
        </NavigationLink>
      </NavigationItem>
      <NavigationItem>
        <NavigationLink to="/contact" className={({ isActive }) => isActive? "active": ''}>
          Contact Us
        </NavigationLink>
      </NavigationItem>
    </NavigationContainer>
  );
};

export default NavBar;
