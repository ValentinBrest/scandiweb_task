import React, { Component } from 'react';
import './App.css';
import Header from './components/Header/Header';
import Body from './components/Body/Body';
import { Route, Routes } from 'react-router-dom';
import { graphql } from '@apollo/client/react/hoc';
import { CATEGORIES_CURRENCIES } from './components/Header/getCategoties';
import Product from './components/Product/Product';
import Cart from './components/Cart/Cart';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { symbol: '$',
					orders: [],
					counters: {},
					totalProd: 0,
					isMinibagOpen: false,
					totalAmount: 0,  
        }    
  }
  
  openMinibag = (isMinibagOpen) => {
	  this.setState({...this.state, isMinibagOpen: isMinibagOpen}, () => {
		  console.log(this.state.counters );
	  })
  } 

  giveToCart = (order) => {
	  this.setState({...this.state, 
                    orders: [...this.state.orders, order], 
                    totalProd: (this.state.totalProd + 1), 
                    counters: {...this.state.counters, [this.state.orders.length]: 1},
					totalAmount: +((this.state.totalAmount + order.price.filter(cur => cur.currency.symbol == this.state.symbol)[0].amount).toFixed(2))
				}, ()=>{})
  } 

  giveCurrency = (symbol) => {
    this.setState({symbol})
}
  addInCounters = (counter, index, count) => {
    this.setState({...this.state, counters: {...this.state.counters, [index]: counter}, totalAmount: +((this.state.totalAmount + count).toFixed(2))}, () => {
		console.log(this.state.counters);
	})
    
  }
  
  render() {
    const {data = { }} = this.props
    const {categories = []} = data;
    return (
      <div className="App">
        <Header giveCurrency={this.giveCurrency} 
				totalProd={this.state.totalProd} 
				orders={this.state.orders} 
				symbol={this.state.symbol}
				isMinibagOpen={this.state.isMinibagOpen}
				openMinibag={this.openMinibag}
				counters={this.state.counters}
				addInCounters={this.addInCounters}
				totalAmount={this.state.totalAmount}
		/>
        <Routes>
          {categories.map(route => ( 
            <>
              <Route key={route.name} path={`${route.name}`} element={<Body symbol={this.state.symbol} />} />
                {route.products.map(item => (
                  <Route key={`${route.name}${item.id}`} 
                        path={`${route.name}/${item.id}`} 
                        element={<Product id={item.id} 
                                  symbol={this.state.symbol} 
                                  giveToCart={this.giveToCart}
                                  getTotalProd={this.getTotalProd}
						/>} 
					/>
                ))}
              
            </>
          ))}
         <Route path="cart" element={<Cart orders={this.state.orders} symbol={this.state.symbol} counters={this.state.counters}
				addInCounters={this.addInCounters}/>}/>         
        </Routes>
    </div>
    );
  }
}

export default graphql(CATEGORIES_CURRENCIES)(App);
