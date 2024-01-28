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
const GET_USER=gql`
query GetUser($userName:String!,$password:String!){
  getUser(userName:$userName,password:$password){
      userName
      userId
      password
      cartItems{
          product{
              productId
              productName
              productImage
              description
              price
          }
          quantity
      }
      orders{
        orderDate
        orderItems{
            product{
                productId
            productName
            productImage
            description
            price
            }
        }
    }
  }
}
`;
const GET_USER_ADDRESSES=gql`
query GetUserAddresses($userId:ID!){
  getUserAddresses(userId:$userId){
      addressId
      postalCode
      street
      city
      houseNo
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


const ADD_USER = gql`
  mutation AddUser($userName: String!, $password: String!) {
    addUser(user: { userName: $userName, password: $password }) {
      userName
    }
  }
`;

const DELETE_CART_ITEM=gql`
mutation DeleteCartitem($cartItemId:ID!){
  deleteCartItem(cartItemId:$cartItemId){
      cartItemId
      product{
        productId  
        productName
        productImage
        description
        price
      }
      quantity
      user{
          userName
      }
  }
}
`;
const ADD_ADDRESS=gql`
mutation AddAddress($userId:ID!,$address:AddressInput!){
  addAddress(userId:$userId,address:$address){
      addressId
      houseNo
      street
      city
      postalCode
  }
}
`;
const CREATE_ORDER=gql`
mutation CreateOrder($userId: Int!, $productId: Int!) {
  createOrder(order: {
      userId: $userId
      orderItems: {
          productId: $productId
      }
  }) {
      orderDate
      orderId
      orderItems {
          product {
              productName
              productId
              productImage
              description
              price
          }
      }
      user {
          userName
      }
  }
}

`;

export {
  GET_PRODUCT,
  GET_ALL_PRODUCTS,
  GET_CART_ITEMS,
  GET_ORDER_HISTORY,
  GET_USER,
  GET_USER_ADDRESSES,
  ADD_PRODUCT,
  ADD_TO_CART,
  PLACE_ORDER,
  ADD_USER,
  DELETE_CART_ITEM,
  ADD_ADDRESS,
  CREATE_ORDER
};
