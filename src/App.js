import React from 'react';
import PropTypes from 'prop-types';
import Header from './components/Header';
import ProductFeature from 'features/Product';
import { Redirect, Route, Switch } from 'react-router-dom';
import Footer from 'components/footer';
import Cartfeature from 'features/Cart';
import Notfound from 'components/Notfound';
import './App.css';

App.propTypes = {};

function App(props) {
  return (
    <div className="App">
      <Header />
      <div style={{ minHeight: '100vh' }}>
        <Switch>
          <Redirect from="/products" to="/" exact />

          <Route path="/cart" component={Cartfeature} exact></Route>
          <Route path="/" component={ProductFeature}></Route>

          <Route component={Notfound}></Route>
        </Switch>
      </div>

      <Footer  />
    </div>
  );
}

export default App;
