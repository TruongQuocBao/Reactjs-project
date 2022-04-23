import React from 'react';
import PropTypes from 'prop-types';
import { Box, Button, Container, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import { useSelector } from 'react-redux';
import CartItems from './CartItems/CartItems';
import { cartItemsCountSelector, cartTotalSelector } from './selectors';
import { formatPriceCurrency } from 'utils';
import Footer from 'components/footer';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: '35px',
  },

  title: {
    marginBottom: '10px',
    fontWeight: 'bold',
  },

  top: {
    margin: '0px',
    padding: '15px',
  },
  button: {
    background: 'rgb(255, 66, 78)',
    color: 'rgb(255, 255, 255)',
    borderRadius: '4px',

    cursor: 'pointer',
    border: 'none',
    textAlign: 'center',

    padding: '13px 10px',

    fontWeight: 'bold',
    fontSize: '100%',

    '&:hover ': {
      opacity: '0.8',
    },
  },

  footer: {
    position: 'fixed',
    bottom: '0',
    right: '0',
    left: '0',
    width: '100%',
  },
}));

Cartfeature.propTypes = {};

function Cartfeature(props) {
  const classes = useStyles();
  const count = useSelector(cartItemsCountSelector);
  const totalPrice = useSelector(cartTotalSelector);

  const cartItemsList = useSelector((state) => state.cart.cartItems);

  return (
    <Box className={classes.root}>
      <Typography variant="h5" className={classes.title}>
        Giỏ hàng
        <Typography variant="body2"> {`(${count} sản phẩm)`}</Typography>
      </Typography>
      <Paper elevation={0}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          className={classes.top}
        >
          <Grid item>
            {' '}
            <Typography variant="h6"> {`TỔNG TIỀN: ${formatPriceCurrency(totalPrice)}`}</Typography>
          </Grid>
          <Grid item>
            <button className={classes.button}>MUA HÀNG </button>
          </Grid>
        </Grid>
      </Paper>

      <Box pt={3}>
        <Paper elevation={0}>
          <Grid container>
            {cartItemsList.map((item, idx) => (
              <Grid item key={idx.toString()} xs={12}>
                <CartItems item={item} />
              </Grid>
            ))}
          </Grid>
        </Paper>
      </Box>
    </Box>
  );
}

export default Cartfeature;
