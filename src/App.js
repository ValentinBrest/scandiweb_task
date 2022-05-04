import React, { Component, Fragment } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { CATEGORIES_CURRENCIES } from "./components/Header/getCategoties";
import { Route, Routes } from "react-router-dom";
import Body from "./components/Body/Body";
import Cart from "./components/Cart/Cart";
import Header from "./components/Header/Header";
import Product from "./components/Product/Product";
import StartPage from "./components/StartPage/StartPage";

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			symbol: "$",
			orders: [],
			counters: {},
			totalProd: 0,
			isMinibagOpen: false,
			totalPrice: {},
			totalAmount: 0,
		};
	}

	openMinibag = (isMinibagOpen) => {
		let totalAmount = this.sumSalaries(this.state.totalPrice, this.state.symbol);

		this.setState(
			{
				...this.state,
				isMinibagOpen: isMinibagOpen,
				totalAmount: totalAmount,
			}
		);
	};

	giveToCart = (order) => {
		
		
		let hasProduct = false
		
		for (let i = 0 ; i < this.state.orders.length; i++){
			if(this.state.orders.length) {
				if ( (this.state.orders[i].id === order.id)) {
					hasProduct = true
				}
			}
			
		}
		if (!hasProduct) {
			let money = {};
			order.price.forEach((cur) => (money[cur.currency.symbol] = cur.amount));
			this.setState(
				{
					...this.state,
					orders: [...this.state.orders, order],
					totalProd: this.state.totalProd + 1,
					counters: {
						...this.state.counters,
						[order.id]: 1,
					},
					totalPrice: {
						...this.state.totalPrice,
						[order.id]: money,
					}
				}
			);
		} else {
			let money = {};
			let count = this.state.counters[order.id] + 1
			order.price.forEach((cur) => (money[cur.currency.symbol] = count * cur.amount));
			this.setState(
				{
					...this.state,
					counters: {
						...this.state.counters,
						[order.id]: this.state.counters[order.id] + 1,
					},
					totalPrice: {
						...this.state.totalPrice,
						[order.id]: money,
					},
				}
			);
		}
		
	};

	getCurrency = (symbol) => {
		this.setState({ ...this.state, symbol }, () => {
			let totalAmount = this.sumSalaries(this.state.totalPrice, this.state.symbol);
			this.setState({ ...this.state, totalAmount: totalAmount });
		});
	};

	addInCounters = (counter, index, price) => {
		this.setState(
			{
				...this.state,
				counters: { ...this.state.counters, [index]: counter },
				totalPrice: { ...this.state.totalPrice, [index]: price },
			},
			() => {
				this.setState({totalAmount: this.sumSalaries(this.state.totalPrice,this.state.symbol)});
			}
		);
	};

	updateOrders = (id) => {
		let index = ''
		for (let i = 0; i < this.state.orders.length; i++) {
			if (this.state.orders[i].id === id) {
				index = i
			}
		}
		this.state.orders.splice(index, 1);
		delete this.state.counters[id];
		let totalAmount = this.sumSalaries({[id]: this.state.totalPrice[id] }, this.state.symbol);
		delete this.state.totalPrice[id];

		this.setState(
			{	...this.state,
				orders: this.state.orders,
				totalProd: this.state.totalProd - 1,
				counters: { ...this.state.counters },
				totalPrice: { ...this.state.totalPrice },
				totalAmount: (this.state.totalAmount - totalAmount).toFixed(2),
			}
		);
	};

	sumSalaries(salaries, symbol) {
		let sum = 0;
		for (let salary of Object.values(salaries)) {
			sum += salary[symbol];
		}
		return sum.toFixed(2);
	}
	

	render() {
		const { data = {} } = this.props;
		const { categories = [], currencies = [] } = data;
		return (
			<div className="App">
				
				<Routes>
					<Route path="/" element={<Header getCurrency={this.getCurrency}
													totalProd={this.state.totalProd}
													orders={this.state.orders}
													symbol={this.state.symbol}
													isMinibagOpen={this.state.isMinibagOpen}
													openMinibag={this.openMinibag}
													counters={this.state.counters}
													addInCounters={this.addInCounters}
													updateOrders={this.updateOrders}
													totalAmount={this.state.totalAmount}
													categories={categories}
													currencies={currencies}
												/>}
					>
						<Route path="*" element={<StartPage/>} />
						{categories.map((route) => (
							<Fragment key={route.name}>
								<Route
									path={`${route.name}/*`}
									element={<Body symbol={this.state.symbol} 
													giveToCart={this.giveToCart} 
													name={`${route.name}`} 
													route={route}
											/>}
								/>
								<Route  path={`${route.name}/:id`}
										element={ <Product
													symbol={this.state.symbol}
													giveToCart={this.giveToCart}
												/>
										}
								/>
							</Fragment>
						))}
						
						<Route path="cart" 
								element={<Cart  orders={this.state.orders}
												symbol={this.state.symbol}
												counters={this.state.counters}
												addInCounters={this.addInCounters}
												updateOrders={this.updateOrders}
										/>}
						/>
					</Route>
				</Routes>
			</div>
		);
	}
}

export default graphql(CATEGORIES_CURRENCIES)(App);
