import React from 'react';
import styled, { keyframes } from 'styled-components';
import { TiTick } from 'react-icons/ti';
import { RiShoppingBag3Line } from 'react-icons/ri';

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 80vh;
`;

const SuccessMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #4caf50;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const OrderPlacedMessage = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  color: #2196f3;
  animation: ${fadeIn} 0.5s ease-in-out;
`;

const IconContainer = styled.div`
  font-size: 32px;
  margin-right: 10px;
`;

const PaymentSuccess = () => {
  return (
    <Container>
      <SuccessMessage>
        <IconContainer>
          <TiTick />
        </IconContainer>
        Payment Successful
      </SuccessMessage>
      <OrderPlacedMessage>
        <IconContainer>
          <RiShoppingBag3Line />
        </IconContainer>
        Order Placed
      </OrderPlacedMessage>
    </Container>
  );
};

export default PaymentSuccess;
