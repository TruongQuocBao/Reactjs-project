import { Badge, Box, IconButton, Menu, MenuItem, useMediaQuery } from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { AccountCircle, Close } from '@material-ui/icons';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from 'asset/images/commerceimage.png';
import StorageKeys from 'constants/storage-keys';
import Login from 'features/Auth/components/Login';
import LoginForm from 'features/Auth/components/LoginForm';
import Register from 'features/Auth/components/Register';
import { logout } from 'features/Auth/userSlice';
import { cartItemsCountSelector } from 'features/Cart/selectors';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import './style.scss';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
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

  // const loggedInUser = useSelector((state) => state.user.current);
  // const isLoggedIn = !!loggedInUser.id;

  const loggedInUser = localStorage.getItem(StorageKeys.USER);
  const isLoggedIn = !!JSON.parse(loggedInUser);

  // console.log(isLoggedIn);

  const cartItemCount = useSelector(cartItemsCountSelector);
  const history = useHistory();

  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [mode, setMode] = useState(MODE.LOGIN);
  const [anchorEl, setAnchorEl] = useState(null);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

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
          <Typography className="header__title">
            <Link className="header__link" to="/">
              Shopping
            </Link>
          </Typography>

          {!isLoggedIn && (
            <Button
              color="inherit"
              onClick={handleClickOpen}
              variant="outlined"
              className="header__btn"
            >
              Đăng Nhập
            </Button>
          )}

          {isLoggedIn && (
            <Button
              color="inherit"
              onClick={handleClickUser}
              variant="outlined"
              className="headrt__btn"
            >
              <AccountCircle style={{ paddingRight: '3px' }} /> {JSON.parse(loggedInUser).fullname}
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
        </Toolbar>
      </AppBar>
      <Dialog
        disableBackdropClick
        disableEscapeKeyDown
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
        className="dialog"
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
