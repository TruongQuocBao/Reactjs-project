import { Badge, Box, IconButton, Menu, MenuItem } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import CodeIcon from '@material-ui/icons/Code';
import Login from 'features/Auth/components/Login';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, NavLink } from 'react-router-dom';

import logo from 'asset/images/commerceimage.png';

import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: 'bold',
    fontSize: '27px',
  },
  closeBtn: {
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
    zIndex: 1,
  },
}));

const MODE = {
  REGISTER: 'register',
  LOGIN: 'login',
};

export default function Header() {
  const dispatch = useDispatch();
  const loggedInUser = useSelector((state) => state.user.current);
  const isLoggedIn = !!loggedInUser.id;
  const cartItemCount = useSelector(cartItemsCountSelector);
  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleClickUser = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleLogoutClick = () => {
    const action = logout();
    dispatch(action);
  };

  const handleCartClick = () => {
    history.push('/cart');
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <img src={logo} style={{ margin: '8px' }} height="40px" />
          <Typography variant="h6" className={classes.title}>
            <Link className={classes.link} to="/">
              Ori-shop
            </Link>
          </Typography>

          {!isLoggedIn && (
            <Button
              color="inherit"
              onClick={handleClickOpen}
              variant="outlined"
              style={{ marginTop: '5px' }}
            >
              Đăng Nhập
            </Button>
          )}

          <IconButton
            aria-label="show 11 new notifications"
            color="inherit"
            onClick={handleCartClick}
          >
            <Badge badgeContent={cartItemCount} color="secondary">
              <ShoppingCartIcon />
            </Badge>
          </IconButton>

          {isLoggedIn && (
            <Button
              color="inherit"
              onClick={handleClickUser}
              style={{ marginTop: '5px' }}
              variant="outlined"
            >
              <AccountCircle style={{ paddingRight: '3px' }} /> {loggedInUser.fullName}
            </Button>
          )}
        </Toolbar>
      </AppBar>
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
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        getContentAnchorEl={null}
      >
        <MenuItem onClick={handleCloseMenu}>Tài khoản</MenuItem>
        <MenuItem onClick={handleLogoutClick}>Đăng xuất</MenuItem>
      </Menu>
    </div>
  );
}
