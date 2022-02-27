import React from 'react';
import PropTypes from 'prop-types';
import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { makeStyles } from '@material-ui/styles';
import './styles.scss';
import FacebookIcon from '@material-ui/icons/Facebook';
import YouTubeIcon from '@material-ui/icons/YouTube';
import InstagramIcon from '@material-ui/icons/Instagram';
Footer.propTypes = {};

const footerlist1 = [
  {
    id: 1,
    title: 'Hot line: 0123456789',
  },
  {
    id: 2,
    title: 'email hỗ trợ: hotro@eshop.vn',
  },
  {
    id: 3,
    title: 'Hướng dẫn mua hàng',
  },
];

const footerList2 = [
  {
    id: 1,
    title: 'Giới thiệu',
  },
  {
    id: 2,
    title: 'chính sách bảo mật',
  },
  {
    id: 3,
    title: 'chính sách đổi trả',
  },
];

function Footer(props) {
  return (
    <Box m={1.5} pt={2.5}>
      <Paper elevation={0}>
        <Grid container direction="row" justifyContent="space-around" alignItems="center">
          <Grid item>
            <ul className="list">
              <Typography variant="h6">Hỗ trợ khác hàng</Typography>
              {footerlist1.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </Grid>

          <Grid item>
            <ul className="list">
              <Typography variant="h6">Về E-Shop</Typography>
              {footerList2.map((item) => (
                <li key={item.id}>{item.title}</li>
              ))}
            </ul>
          </Grid>
          {/* <Grid item> phương thức thanh toán</Grid> */}
          <Grid item>
            <ul className="socialList">
              <Typography variant="h6"> Kết nối với chúng tôi</Typography>
              <li>
                <div>
                  <FacebookIcon />
                </div>
                face
              </li>
              <li>
                <div>
                  <YouTubeIcon />
                </div>
                Youtube
              </li>
              <li>
                <div>
                  <InstagramIcon />
                </div>
                Intagram
              </li>
            </ul>
          </Grid>
        </Grid>
        <Typography align="center"> © Copyright by Eward 2022.</Typography>
      </Paper>
    </Box>
  );
}

export default Footer;
