import {
  Box,
  Container,
  Grid,
  IconButton,
  LinearProgress,
  makeStyles,
  Paper,
} from '@material-ui/core';
import { addToCart } from 'features/Cart/cartSlice';
import { useSnackbar } from 'notistack';

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Switch, useRouteMatch } from 'react-router';
import { useHistory } from 'react-router-dom';
import AddToCartForm from '../components/AddToCardForm';

import ProductAdditional from '../components/ProductAdditional';
import ProductDescription from '../components/ProductDescription';
import ProductInfo from '../components/ProductInfo';
import ProductMenu from '../components/ProductMenu';
import ProductReviews from '../components/ProductReviews';
import ProductThumbnail from '../components/ProductThumbnail';
import useProductDetail from '../hooks/useProductDetail';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { AccountCircle, Close } from '@material-ui/icons';
import Register from 'features/Auth/components/Register';
import Login from 'features/Auth/components/Login';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingBottom: theme.spacing(3),
  },

  left: {
    width: '400px',
    padding: theme.spacing(1.5),
    borderRight: `1px solid ${theme.palette.grey[300]}`,
  },

  right: {
    flex: '1 1 0',
    padding: theme.spacing(1.5),
  },

  loading: {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
  },
}));
const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

function DetailPage() {
  const classes = useStyles();
  const {
    params: { productId },
    url,
  } = useRouteMatch();
  console.log(url);

  const { product, loading } = useProductDetail(productId);

  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const [mode, setMode] = useState(MODE.LOGIN);
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  if (loading) {
    return (
      <Box className={classes.loading}>
        <LinearProgress />
      </Box>
    );
  }

  const handleAddToCartSubmit = ({ quantity }) => {
    const action = addToCart({
      id: product.id,
      product,
      quantity,
    });
    dispatch(action);
    enqueueSnackbar('Thêm vào giỏ hàng thành công !!!🎉', { variant: 'success' });
  };

  return (
    <Box className={classes.root}>
      <Container>
        <Paper elevation={0}>
          <Grid container>
            <Grid item className={classes.left}>
              <ProductThumbnail product={product} />
            </Grid>

            <Grid item className={classes.right}>
              <ProductInfo product={product} />

              <AddToCartForm onSubmit={isLoggedIn ? handleAddToCartSubmit : handleClickOpen} />
              <Dialog
                disableBackdropClick
                disableEscapeKeyDown
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
              >
                <IconButton>
                  <Close className={classes.closeBtn} onClick={handleClose}></Close>
                </IconButton>

                <DialogContent>
                  {mode === MODE.REGISTER && (
                    <>
                      <Register closeDialog={handleClose}></Register>

                      <Box textAlign="center">
                        <Button color="primary" onClick={() => setMode(MODE.LOGIN)}>
                          Bạn đã có tài khoản ? Đăng nhập tại đây
                        </Button>
                      </Box>
                    </>
                  )}

                  {mode === MODE.LOGIN && (
                    <>
                      <Login closeDialog={handleClose}></Login>

                      <Box textAlign="center">
                        <Button color="primary" onClick={() => setMode(MODE.REGISTER)}>
                          Bạn chưa có tài khoản ? Đăng ký tại đây
                        </Button>
                      </Box>
                    </>
                  )}
                </DialogContent>
              </Dialog>
            </Grid>
          </Grid>
        </Paper>

        <ProductMenu />

        <Switch>
          <Route exact path={url}>
            <ProductDescription product={product} />
          </Route>

          <Route path={`${url}/additional`} component={ProductAdditional} />
          <Route path={`${url}/reviews`} component={ProductReviews} />
        </Switch>
      </Container>
    </Box>
  );
}

export default DetailPage;
