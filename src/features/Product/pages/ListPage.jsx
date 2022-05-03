import { Box, Container, Grid, Paper, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import productApi from 'api/ProductApi';
import ProductSkeletonList from '../components/ProductSkeletonList';
import ProductList from '../components/ProductList';
import Pagination from '@material-ui/lab/Pagination';
import queryString from 'query-string';

import ProductSort from '../components/ProductSort';
import ProductFilters from '../components/ProductFilters';
import FilterViewer from '../components/FilterViewer';
import { useHistory, useLocation } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';

import './styles.scss';
import { Close } from '@material-ui/icons';

import { doc, getDoc } from 'firebase/firestore';
import { db } from '../../../api/apiFirebase';

const useStyles = makeStyles((theme) => ({
  root: {
    // flexGrow: 1,
  },

  left: {
    width: '250px',
  },

  right: {
    flex: '1 1 0',
  },

  pagination: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'center',

    marginTop: '35px',
    paddingBottom: '20px',
  },
}));

function ListPage(props) {
  const classes = useStyles();

  const history = useHistory();
  const location = useLocation();
  const queryParams = useMemo(() => {
    const params = queryString.parse(location.search);
    // console.log('sdgasdgd', params);
    return {
      ...params,
      _page: Number.parseInt(params._page) || 1,
      _limit: Number.parseInt(params._limit) || 2,
      _sort: params._sort || 'salePrice:ASC',
      isPromotion: params.isPromotion === 'true',
      isFreeShip: params.isFreeShip === 'true',
      startAfter: params === '1' ? null : params.startAfter,
    };
  }, [location.search]);

  const [productList, setProductList] = useState([]);
  const [pagination, setpagination] = useState({
    limit: 2,
    total: 0,
    page: 1,
    startAfter: null,
  });
  const [Loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const { data, pagination: pa } = await productApi.getAll(
          queryParams,
          pagination.startAfter
        );

        setProductList(data);
        setpagination(pa);
      } catch (error) {
        console.log('failed to fetch product list', error);
      }

      setLoading(false);
    })();
  }, [queryParams]);

  const handlePageChange = (e, page) => {
    let filters;
    if (page === 1) {
      delete queryParams.startAfter;
      filters = {
        ...queryParams,
        _page: page,
      };
    } else {
      filters = {
        ...queryParams,
        _page: page,
        startAfter: pagination.startAfter,
      };
    }

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleSortChange = (newSortValue) => {
    const filters = {
      ...queryParams,
      _sort: newSortValue,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const handleFiltersChange = (newFilters) => {
    delete queryParams.startAfter;
    const filters = {
      ...queryParams,
      ...newFilters,
      _page: 1,
    };

    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(filters),
    });
  };

  const setNewFilters = (newFilters) => {
    history.push({
      pathname: history.location.pathname,
      search: queryString.stringify(newFilters),
    });
  };

  const handleClickToggle = () => {
    const filters = document.querySelector('.listpage__left');
    const close = document.querySelector('.listpage__close');
    if (filters) {
      filters.classList.add('is-active');
    }
    if (close) {
      close.classList.add('is-active');
    }
  };

  const handleClickclose = () => {
    const filters = document.querySelector('.listpage__left');
    const close = document.querySelector('.listpage__close');
    filters.classList.remove('is-active');
    close.classList.remove('is-active');
  };
  return (
    <Box>
      <Container>
        <Grid container spacing={1} className="listpage">
          <Paper elevation={0} className="listpage__toggle">
            <MenuIcon onClick={handleClickToggle} />
          </Paper>
          <div className="listpage__close" onClick={handleClickclose}>
            <Close />
          </div>

          <Grid item className="listpage__left">
            <Paper elevation={0} className="listpage__mobile">
              <ProductFilters filters={queryParams} onChange={handleFiltersChange} />
            </Paper>
          </Grid>

          <Grid item className="listpage__right">
            <Paper elevation={0}>
              <ProductSort currentSort={queryParams._sort} onChange={handleSortChange} />
              <FilterViewer filters={queryParams} onChange={setNewFilters} />
              {Loading ? <ProductSkeletonList length={9} /> : <ProductList data={productList} />}

              <Box className="listpage__pagination">
                <Pagination
                  color="primary"
                  count={Math.ceil(pagination.total / pagination.limit)}
                  page={pagination.page}
                  onChange={handlePageChange}
                />
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default ListPage;
