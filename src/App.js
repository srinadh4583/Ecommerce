// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ContactUs from './pages/Contactus';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import { CartProvider } from './components/context/CartContext';
import Checkout from './components/order/OrderProcess';
import './App.css';

// Create the Apollo Client instance
const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql', // Your GraphQL server endpoint
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <CartProvider>
      <Router>
        <div className="app">
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path='/placeorder' element={<Checkout/>}/>
          </Routes>
        </div>
      </Router>
      </CartProvider>
    </ApolloProvider>
  );
};

export default App;
