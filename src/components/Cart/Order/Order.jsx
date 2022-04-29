import React, { Component } from "react";
import Attribute from "./Attribtute/Attribute";
import cl from "./Order.module.css";
import mcl from "./MinibagOrder.module.css";

class Order extends Component {
	constructor(props) {
		super(props);
		this.state = {
			count: this.props.count,
			startPrice: {},
			price: null,
			mainImg: null,
			indexImg: 0,
		};
	}

    componentDidUpdate(prevProps) {
		if (this.props.count !== prevProps.count) {
			this.setState({ ...this.state, count: this.props.count });
		}
	}

	increment = () => {
		let money = {};
		let count = this.state.count + 1;
		this.props.price.forEach((cur) => (money[cur.currency.symbol] = count * cur.amount));

		this.setState({ ...this.state, count: count, price: money }, () => {
			this.props.addInCounters(this.state.count, this.props.index, money);
		});
	};

	decrement = () => {
		let money = {};
		let count = this.props.count - 1 <= 1 ? 1 : this.props.count - 1;
		if (this.state.count > 1) {
			this.props.price.forEach((cur) => (money[cur.currency.symbol] = count * cur.amount));
			this.setState({ ...this.state, count: count, price: money }, () => {
				this.props.addInCounters(this.state.count, this.props.index, money);
			});
		}
	};

	deleteProduct = (index) => {
		this.props.updateOrders(index);
	};

	changeImg(where) {
		let indexImg =
			where === "back"
				? this.state.indexImg === 0
					? 0
					: this.state.indexImg - 1
				: this.state.indexImg + 1 > this.props.gallery.length - 1
                    ? this.props.gallery.length - 1
                    : this.state.indexImg + 1;

		this.setState({...this.state, mainImg: this.props.gallery[indexImg], indexImg: indexImg});
	}

    getClassName = (classStyleName) => {
        let miniBag = this.props.miniBagOrder
        return miniBag ? mcl[classStyleName]: cl[classStyleName]
    }

	render() {
        let imgSrc = this.state.mainImg? this.state.mainImg: this.props.gallery[0]
		return (
			<div className={this.getClassName('order__wrap')}>
				<div className={cl.left__info}>
					<div className={this.getClassName('brand')}>{this.props.brand}</div>
					<div className={this.getClassName('name')}>{this.props.name}</div>
					<div className={this.getClassName('price')}>
						{this.props.symbol}
						{this.props.price.filter((cur) =>cur.currency.symbol === this.props.symbol)[0].amount}
					</div>
					<div className={this.getClassName('attr__wrap')}>
						{this.props.attributesAll.map((attrItem, index) => (
							<Attribute  key={index}
                                        name={attrItem.name}
                                        value={this.props.attr[attrItem.name].value}
                                        miniBagOrder={this.props.miniBagOrder}
                            />
						))}
					</div>
				</div>
                
				<div className={this.getClassName('right__info')}>
					<div className={this.getClassName('button__wrap')}>
						<button className={this.getClassName('button')}>
							<div className={this.getClassName('button__plus')} onClick={this.increment}></div>
						</button>

						<span>{this.props.count}</span>

						<button className={this.getClassName('button')}>
							<div className={this.getClassName('button__minus')} onClick={this.decrement}></div>
						</button>
					</div>

					<div className={this.getClassName('img__block')}>
						{this.props.gallery.length > 1 
                            ? <>
                                <div className={cl.arrow_left} onClick={() => this.changeImg("back")}></div>
								<div className={cl.arrow_right} onClick={() => this.changeImg("go")}></div>
							</>
						    : ""
                        }
						<img src={imgSrc} alt="photos" />
					</div>
				</div>
				<button className={this.getClassName('button__delete')} onClick={() => this.deleteProduct(this.props.index)}>
					&times;
				</button>
			</div>
		);
	}
}

export default Order;
