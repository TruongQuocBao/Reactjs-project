import { Box, Grid, Paper, Typography } from '@material-ui/core';
import FacebookIcon from '@material-ui/icons/Facebook';
import InstagramIcon from '@material-ui/icons/Instagram';
import YouTubeIcon from '@material-ui/icons/YouTube';
import React from 'react';
import './styles.scss';
Footer.propTypes = {};

const footerList1 = [
  {
    id: 1,
    title: 'Hot line: 0123456789',
  },
  {
    id: 2,
    title: 'Email hỗ trợ: hotro@shopping.vn',
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
    <div className="footer">
      <Paper elevation={0}>
        <div className="footer__main">
          <div className="footer__col">
            <h3 className="footer__title"> Hỗ trợ khách hàng</h3>
            <ul className="footer__links">
              {footerList1.map((item) => (
                <li key={item.id} className="footer__item">
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__title"> Về chúng tôi</h3>
            <ul className="footer__links">
              {footerList2.map((item) => (
                <li key={item.id} className="footer__item">
                  {item.title}
                </li>
              ))}
            </ul>
          </div>

          <div className="footer__col">
            <h3 className="footer__title"> Kết nối với chúng tôi</h3>
            <ul className="footer__links">
              <li className="footer__item footer__social">
                <div>
                  <FacebookIcon />
                </div>
                Facebook
              </li>
              <li className="footer__item footer__social">
                <div>
                  <YouTubeIcon />
                </div>
                Youtube
              </li>
              <li className="footer__item footer__social ">
                <div>
                  <InstagramIcon />
                </div>
                Intagram
              </li>
            </ul>
          </div>
        </div>
      </Paper>
    </div>
  );
}

export default Footer;
