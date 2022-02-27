import { Box, Link, makeStyles, Typography } from '@material-ui/core';
import React from 'react';
import { NavLink, useRouteMatch } from 'react-router-dom';

ProductMenu.propTypes = {};

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',
    alignItems: 'center',

    padding: 0,
    listStyleType: 'none',

    '& > li': {
      padding: theme.spacing(2, 4),
    },

    '& > li > a': {
      color: theme.palette.grey[700],
    },

    '& > li > a.active': {
      color: theme.palette.primary.main,
      textDecoration: 'underline',
    },
  },
}));

function ProductMenu(props) {
  const classes = useStyles();
  const { url } = useRouteMatch();

  return (
    <Box component="ul" className={classes.root}>
      <li>
        <Link component={NavLink} to={url} exact>
          <Typography variant="h5">Mô tả</Typography>
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${url}/additional`} exact>
          <Typography variant="h5">Thông tin bổ sung</Typography>
        </Link>
      </li>

      <li>
        <Link component={NavLink} to={`${url}/reviews`} exact>
          <Typography variant="h5">Đánh giá</Typography>
        </Link>
      </li>
    </Box>
  );
}

export default ProductMenu;
