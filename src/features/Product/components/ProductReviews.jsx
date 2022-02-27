import { Box, Paper, Typography } from '@material-ui/core';
import React from 'react';

ProductReviews.propTypes = {};

function ProductReviews(props) {
  return (
    <Paper elevation={0}>
      <Box p={1.5}>
        <Typography variant="h5">Đánh giá - Nhận xét từ khách hàng</Typography>
      </Box>

      <Box textAlign="center" m={1} style={{ paddingBottom: '18px' }}>
        Chưa có đánh giá nào cho sản phẩm này 😊😊😊
      </Box>
    </Paper>
  );
}

export default ProductReviews;
