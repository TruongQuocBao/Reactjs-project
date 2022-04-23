import React from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  makeStyles,
  OutlinedInput,
  TextField,
} from '@material-ui/core';
import { STATIC_HOST } from 'constants';
import { THUMBNAIL_PLACEHOLDER } from 'constants';
import '../CartItems/styles.scss';
import { formatPriceCurrency } from 'utils';
import QuantityField from 'components/Form-controls/QuantityField';
import { AddCircleOutline, RemoveCircleOutline } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import { removeFromCart, setQuantity } from '../cartSlice';
import { useDispatch } from 'react-redux';
import Footer from 'components/footer';

CartItems.propTypes = {
  item: PropTypes.object,
};

const useStyles = makeStyles((theme) => ({
  root: {},
  input: {
    width: '65px',
  },

  remove: {},
}));

function CartItems({ item }) {
  const classes = useStyles();
  const dispatch = useDispatch();
  console.log(item);

  const thumbnailUrl = item.product.thumbnail
    ? `${STATIC_HOST}${item.product.thumbnail?.url}`
    : THUMBNAIL_PLACEHOLDER;

  const increaseQuantity = () => {
    const action = setQuantity({
      id: item.id,
      quantity: item.quantity + 1,
    });

    dispatch(action);
  };

  const decreaseQuantity = () => {
    const action = setQuantity({
      id: item.id,
      quantity: item.quantity - 1 === 0 ? 1 : item.quantity - 1,
    });

    dispatch(action);
  };

  const removeItem = () => {
    const action = removeFromCart(item.id);
    dispatch(action);
  };

  return (
    <>
      <Box>
        <Grid container direction="row" justifyContent="space-between" alignItems="center">
          <img src={thumbnailUrl} alt={item.product.name} width="13%" />

          <Grid item> {item.product.name}</Grid>

          <Grid item> {formatPriceCurrency(item.product.salePrice)} </Grid>

          <Grid item>
            <IconButton onClick={decreaseQuantity}>
              <RemoveCircleOutline />
            </IconButton>
            <TextField
              size="small"
              variant="outlined"
              value={item.quantity}
              className={classes.input}
            />

            <IconButton onClick={increaseQuantity}>
              <AddCircleOutline />
            </IconButton>
          </Grid>
          <Grid item>
            <IconButton onClick={removeItem} className={classes.remove}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}

export default CartItems;
