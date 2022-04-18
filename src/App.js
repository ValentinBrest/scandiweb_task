import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import { Route, Routes } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { CATEGORIES_CURRENCIES } from './components/Header/getCategoties';
import Product from './components/Product/Product';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { symbol: '$'}
  }

  giveCurrency = (symbol) => {
    this.setState({symbol})
}
  render() {
    const {data = { }} = this.props
    const {categories = []} = data;
    return (
      <div className="App">
        <Header giveCurrency={this.giveCurrency}/>
        <Routes>
          {categories.map(route => ( 
            <>
              <Route key={route.name} path={`${route.name}`} element={<Body symbol={this.state.symbol}/>} />
                {route.products.map(item => (
                  <Route key={`${route.name}${item.id}`} path={`${route.name}/${item.id}`} element={<Product id={item.id} symbol={this.state.symbol}/>} />
                ))}
              
            </>
          ))}

        </Routes>
    </div>
    );
  }
}


export default graphql(CATEGORIES_CURRENCIES)(App);
