import { gql } from 'graphql-tag';
// import { useQuery, useMutation } from '@apollo/client';
const GET_PRODUCT = gql`
  query GetProduct($productId: ID!) {
    getProduct(productId: $productId) {
      productId
      productName
      price
      description
      productImage
    }
  }
`;

const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      productId
      productName
      price
      description
      productImage
    }
  }
`;

const GET_CART_ITEMS = gql`
  query GetCartItems($userId: ID!) {
    getCartItems(userId: $userId) {
      cartItemId
      product {
        productName
        productId
        price
        description
        productImage
      }
      quantity
      user {
        userId
        userName
      }
    }
  }
`;

const GET_ORDER_HISTORY = gql`
  query GetOrderHistory($userId: ID!) {
    getOrderHistory(userId: $userId) {
      orderId
      orderDate
      user {
        userName
        userId
      }
    }
  }
`;

const ADD_PRODUCT = gql`
  mutation AddProduct($product: ProductInput!) {
    addProduct(product: $product) {
      productName
      productId
      price
      description
      productImage
    }
  }
`;

const ADD_TO_CART = gql`
  mutation AddToCart($cartItem: AddToCartInput!) {
    addToCart(cartItem: $cartItem) {
      cartItemId
      product {
        productName
        productId
        price
        description
        productImage
      }
      quantity
      user {
        userName
        userId
      }
    }
  }
`;

const PLACE_ORDER = gql`
  mutation PlaceOrder($userId: ID!) {
    placeOrder(order: { userId: $userId }) {
      orderDate
      orderId
      user {
        userId
        userName
      }
    }
  }
`;

// const ADD_User=gql`
// mutation{
//   addUser(user:{
//       userName:"gopi"
//       password:"gopi@683"
//   }){
//       userName
//   }
// }
//`;
const ADD_USER = gql`
  mutation AddUser($userName: String!, $password: String!) {
    addUser(user: { userName: $userName, password: $password }) {
      userName
      # Include any other fields you want to retrieve after adding the user
    }
  }
`;

export {
  GET_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  GET_ORDER_HISTORY,
  ADD_PRODUCT,
  ADD_TO_CART,
  PLACE_ORDER,
  ADD_USER
};
