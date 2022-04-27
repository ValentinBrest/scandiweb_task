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
          totalPrice: {},
          totalAmount: 0
        }    
  }
  
  openMinibag = (isMinibagOpen) => {
    let totalAmount = this.sumSalaries(this.state.totalPrice, this.state.symbol)
	  this.setState({...this.state, isMinibagOpen: isMinibagOpen, totalAmount: totalAmount}, () => {})
  } 

  giveToCart = (order) => {
    let money = {}
    order.price.forEach(cur => money[cur.currency.symbol] = cur.amount)

	  this.setState({...this.state, 
                    orders: [...this.state.orders, order], 
                    totalProd: (this.state.totalProd + 1), 
                    counters: {...this.state.counters, [this.state.orders.length]: 1},
                    totalPrice: {...this.state.totalPrice, [this.state.orders.length]: money}
        }, () => {})
  } 


  getCurrency = (symbol) => {
    this.setState({...this.state, symbol},() => {
      let totalAmount = this.sumSalaries(this.state.totalPrice, this.state.symbol)
      this.setState({...this.state, totalAmount: totalAmount}, () => {})
    })
}
  addInCounters = (counter, index, price) => {
    this.setState({...this.state, 
                  counters: {...this.state.counters, [index]: counter}, 
                  totalPrice: {...this.state.totalPrice, [index]: price},},
    () => {this.setState({totalAmount: this.sumSalaries(this.state.totalPrice, this.state.symbol)}, () => {})})
  }

  updateOrders = (index, price) => {
          this.state.orders.splice(index, 1, null)
          delete this.state.counters[index]
          delete this.state.totalPrice[index]
          let totalAmount = this.sumSalaries({[index]: price}, this.state.symbol)
          
          this.setState({...this.state, 
            orders: this.state.orders, 
            totalProd: (this.state.totalProd - 1), 
            counters: {...this.state.counters},
            totalPrice: {...this.state.totalPrice},
            totalAmount: (this.state.totalAmount - totalAmount).toFixed(2)
      }, ()=>{})
  }

  sumSalaries(salaries, symbol) {
    let sum = 0;
    for (let salary of Object.values(salaries)) {
      sum += salary[symbol];
    }
    return (sum).toFixed(2); 
  }


  render() {
    const {data = { }} = this.props
    const {categories = []} = data;
    return (
      <div className="App">
        <Header getCurrency={this.getCurrency} 
				totalProd={this.state.totalProd} 
				orders={this.state.orders} 
				symbol={this.state.symbol}
				isMinibagOpen={this.state.isMinibagOpen}
				openMinibag={this.openMinibag}
				counters={this.state.counters}
				addInCounters={this.addInCounters}
        updateOrders={this.updateOrders}
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
				addInCounters={this.addInCounters} updateOrders={this.updateOrders}/>}/>         
        </Routes>
    </div>
    );
  }
}

export default graphql(CATEGORIES_CURRENCIES)(App);
