import React from 'react';
import PropTypes from 'prop-types';
import { Box, Tab, Tabs } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '8px 0px 0px',
    borderBottom: '1px solid #e0e0e0',
  },
}));

ProductSort.propTypes = {
  currentSort: PropTypes.string.isRequired,
  onChange: PropTypes.func,
};

function ProductSort({ currentSort, onChange }) {
  const classes = useStyles();

  const handleSortChange = (event, newValue) => {
    if (onChange) onChange(newValue);
  };

  return (
    <Box className={classes.root}>
      <Tabs
        value={currentSort}
        indicatorColor="primary"
        textColor="primary"
        onChange={handleSortChange}
        aria-label="disabled tabs example"
      >
        <Tab label="Giá thấp tới cao " value="salePrice:ASC" />
        <Tab label="Giá cao xuống thấp" value="salePrice:DESC" />
      </Tabs>
    </Box>
  );
}

export default ProductSort;
