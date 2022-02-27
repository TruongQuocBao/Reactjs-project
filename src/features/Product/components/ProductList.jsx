import { Box, Grid, makeStyles } from '@material-ui/core';

import PropTypes from 'prop-types';
import React from 'react';
import Product from './product';

ProductList.propTypes = {
  data: PropTypes.array,
};

ProductList.defaultProps = {
  data: [],
};

const useStyles = makeStyles((them) => ({
  root: {},
  item: {
    // margin: '2px',
  },
}));

function ProductList({ data }) {
  const classes = useStyles();
  return (
    <Box m={0.5}>
      <Grid container className={classes.item}>
        {data.map((product) => (
          <Grid item key={product.id} xs={12} sm={6} md={4} lg={3}>
            <Product product={product} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default ProductList;
