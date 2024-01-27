import React from 'react';
import { FaPaypal, FaApplePay, FaGooglePay } from 'react-icons/fa'; 
import '../../App.css'
import {  useNavigate } from 'react-router-dom';

function Payment() {
    const navigate=useNavigate();
const handleSubmit=()=>{
    navigate("/paymentSuccess")
}
  return (
    <div className="modal">
      <form className="form" onSubmit={handleSubmit}>
        <div className="payment--options">
          <button name="paypal" type="button">
            <FaPaypal />
          </button>
          <button name="apple-pay" type="button">
            <FaApplePay />
          </button>
          <button name="google-pay" type="button">
            <FaGooglePay />
          </button>
        </div>
        <div className="separator">
          <hr className="line" />
          <p>or pay using credit card</p>
          <hr className="line" />
        </div>
        <div className="credit-card-info--form">
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Card holder full name
            </label>
            <input
              id="password_field"
              className="input_field"
              type="text"
              name="input-name"
              title="Input title"
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Card Number
            </label>
            <input
              id="password_field"
              className="input_field"
              type="number"
              name="input-name"
              title="Input title"
              placeholder="0000 0000 0000 0000"
              required
              pattern='[0-9]{3}'
            />
          </div>
          <div className="input_container">
            <label htmlFor="password_field" className="input_label">
              Expiry Date / CVV
            </label>
            <div className="split">
              <input
                id="password_field"
                className="input_field"
                type="text"
                name="input-name"
                title="Expiry Date"
                placeholder="01/23"
                required
              />
              <input
                id="password_field"
                className="input_field"
                type="number"
                name="cvv"
                title="CVV"
                placeholder="CVV"
                required
                pattern='[0-9]{3}'
              />
            </div>
          </div>
        </div>
        <button className="purchase--btn">Pay</button>
      </form>
    </div>
  );
}

export default Payment;
