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
		let money = {};
		order.price.forEach((cur) => (money[cur.currency.symbol] = cur.amount));

		this.setState(
			{
				...this.state,
				orders: [...this.state.orders, order],
				totalProd: this.state.totalProd + 1,
				counters: {
					...this.state.counters,
					[this.state.orders.length]: 1,
				},
				totalPrice: {
					...this.state.totalPrice,
					[this.state.orders.length]: money,
				},
			}
		);
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

	updateOrders = (index) => {
		this.state.orders.splice(index, 1, null);
		delete this.state.counters[index];
		let totalAmount = this.sumSalaries({[index]: this.state.totalPrice[index] }, this.state.symbol);
		delete this.state.totalPrice[index];

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
		const { categories = [] } = data;
		return (
			<div className="App">
				<Header
					getCurrency={this.getCurrency}
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
					<Route path="*" element={<StartPage/>} />
					{categories.map((route) => (
						<Fragment key={route.name}>
							<Route
								path={`${route.name}`}
								element={<Body symbol={this.state.symbol} giveToCart={this.giveToCart} name={`${route.name}`}/>}
							/>
							{route.products.map((item) => (
								<Route  key={`${route.name}${item.id}`}
										path={`${route.name}/${item.id}`}
										element={ <Product
													id={item.id}
													symbol={this.state.symbol}
													giveToCart={this.giveToCart}
												/>
										}
								/>
							))}
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
				</Routes>
			</div>
		);
	}
}

export default graphql(CATEGORIES_CURRENCIES)(App);
