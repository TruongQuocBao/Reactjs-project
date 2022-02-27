import React from 'react';
import PropTypes from 'prop-types';
import FiltersByCategory from './Filters/FiltersByCategory';
import { Box } from '@material-ui/core';
import FiltersByPrice from './Filters/FiltersByPrice';
import FiltersByService from './Filters/FiltersByService';

ProductFilters.propTypes = {
  filters: PropTypes.object.isRequired,
  onChange: PropTypes.func,
};

function ProductFilters({ filters, onChange }) {
  const handelCategoryChange = (newCategoryId, newCategoryName) => {
    if (!onChange) return;

    const newFilters = {
      'category.id': newCategoryId,
      'category.name': newCategoryName,
    };

    onChange(newFilters);
  };

  const handelPriceChange = (values) => {
    if (onChange) {
      onChange(values);
    }
  };
  return (
    <Box>
      <FiltersByCategory onChange={handelCategoryChange} />
      <FiltersByPrice onChange={handelPriceChange} />
      <FiltersByService filters={filters} onChange={handelPriceChange} />
    </Box>
  );
}

export default ProductFilters;
