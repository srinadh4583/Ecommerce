import {React} from 'react';
import { BrowserRouter as Router, Routes, Route,Navigate } from 'react-router-dom';
import Header from './components/Header/Header';
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import Cart from './pages/Cart';
import ContactUs from './pages/Contactus';
import { ApolloProvider } from '@apollo/client';
import { ApolloClient, InMemoryCache } from '@apollo/client';
import Checkout from './components/order/OrderProcess';
import './App.css';
import SignUp from './components/Login&SignUp/SignUp';
import Login from './components/Login&SignUp/Login';
import { AuthProvider, useAuth } from './components/Authentication/AuthContext';

const client = new ApolloClient({
  uri: 'http://localhost:8080/graphql',
  cache: new InMemoryCache(),
});

const App = () => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </ApolloProvider>
  );
};

const AppRouter = () => {
  const { isAuthenticated } = useAuth();
 

  return (
    <Router>
      <div className="app">
        {/* Render the Header component only if the user is authenticated */}
        {isAuthenticated && <Header />}

        {/* Routes for different pages */}
        <Routes>
          {/* Redirect to Home if authenticated */}
          {isAuthenticated ? (
            <>
              <Route path="/login" element={<Navigate to="/home" />} />
              <Route path='/home' element={<Home/>}/>
              <Route path="/about" element={<About />} />
              <Route path="/products" element={<Products />} />
              <Route path="/contact" element={<ContactUs />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/placeorder" element={<Checkout />} />  
            </>
          ) : (
            <>
              <Route path="/" element={<SignUp />} />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
