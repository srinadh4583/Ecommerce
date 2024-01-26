// Products.js

import React, { useState } from 'react';
import styled from 'styled-components';
import ProductCard from '../components/ProductQuery/ProductCard';
import Filters from '../components/ProductQuery/Filters';
import SearchBar from '../components/ProductQuery/SearchBar';
import { GET_ALL_PRODUCTS } from '../services/graphql';
import { useQuery } from '@apollo/client';
import Spinner from '../components/Spinner';
import SomeThingWentWrong from '../components/Error/SomeThingWentWrong';

const ProductsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

const FiltersAndSearchContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const categoriesData = ["shirt", "pant", "mobiles", "laptops"];

const Products = () => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const { loading, error, data: productsData } = useQuery(GET_ALL_PRODUCTS);

  if (loading) return <Spinner/>;
  if (error) return <SomeThingWentWrong/>;

  const filteredProducts = productsData.getAllProducts.filter((product) => {
    return (
      (selectedFilters.length === 0 || selectedFilters.includes(product.category)) &&
      (product.productName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });

  return (
    <>
      <FiltersAndSearchContainer>
        <Filters
          categories={categoriesData}
          selectedFilters={selectedFilters}
          onFilterChange={setSelectedFilters}
        />
        <SearchBar searchQuery={searchQuery} onSearchChange={setSearchQuery} />
      </FiltersAndSearchContainer>
      <ProductsContainer>
        {filteredProducts.map((product) => (
          <ProductCard key={product.productId} product={product} />
        ))}
      </ProductsContainer>
    </>
  );
};

export default Products;
