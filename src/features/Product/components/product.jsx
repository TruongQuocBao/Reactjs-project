import { Box, makeStyles, Typography } from '@material-ui/core';
import { STATIC_HOST, THUMBNAIL_PLACEHOLDER } from 'constants/index';
import PropTypes from 'prop-types';
import React from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { formatPrice, formatPriceCurrency } from 'utils';

Product.propTypes = {
  product: PropTypes.object,
};

const useStyles = makeStyles((them) => ({
  root: {},
  card: {
    // display: 'flex',
    padding: '10px',
    // justifyContent: 'space-between',
    border: '1px solid #00000000',

    '&:hover': {
      cursor: 'pointer',
      transform: 'scale(1.03)',
      boxShadow: '0 0.2rem 0.7rem 0.2rem rgba(0, 0, 0, 0.15)',
    },
  },
}));

function Product({ product }) {
  const classes = useStyles();
  const history = useHistory();

  const thumbnailUrl = product.thumbnail
    ? `${STATIC_HOST}${product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const handleClick = () => {
    history.push(`products/${product.id}`);
  };

  return (
    <Box padding={1} className={classes.card} onClick={handleClick}>
      <Box padding={1} minHeight="215px">
        <img src={thumbnailUrl} alt={product.name} width="100%" />
      </Box>
      <Typography variant="body2">{product.name}</Typography>
      <Typography variant="body2">
        <Box component="span" fontSize="16px" fontWeight="bold" mr={1}>
          {formatPriceCurrency(product.salePrice)}
        </Box>
        <Box>
          <img
            src="https://salt.tikicdn.com/ts/upload/2e/da/c9/4b9c0150392c753ccb65b2595500e9d6.png"
            width="110px"
            height="22px"
          />
        </Box>
        {product.promotionPercent > 0 ? `-${product.promotionPercent}%` : ''}
      </Typography>
    </Box>
  );
}

export default Product;
