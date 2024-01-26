// Filters.js
import styled from 'styled-components';

const FiltersContainer = styled.div`
  border: 1px solid #ddd;
  padding: 10px;
  margin: 10px;
  border-radius: 8px;
`;

const Filters = ({ categories, selectedFilters, onFilterChange }) => {
  const handleFilterChange = (category) => {
    const updatedFilters = [...selectedFilters];

    if (updatedFilters.includes(category)) {
      updatedFilters.splice(updatedFilters.indexOf(category), 1);
    } else {
      updatedFilters.push(category);
    }

    onFilterChange(updatedFilters);
  };

  return (
    <FiltersContainer>
      <h3>Filters</h3>
      {categories.map((category) => (
        <label key={category}>
          <input
            type="checkbox"
            value={category}
            checked={selectedFilters.includes(category)}
            onChange={() => handleFilterChange(category)}
          />
          {category}
        </label>
      ))}
    </FiltersContainer>
  );
};

export default Filters;
