import React, { Component } from "react";
import { graphql } from "@apollo/client/react/hoc";
import { PRODUCTS } from "./getProduct";
import Button from "../UI/Button/Button";
import Radio from "../UI/Radio/Radio";
import cl from "./Product.module.css";

class Product extends Component {
	constructor(props) {
		super(props);
		this.state = { mainImg: null, attr: {}, isAddedProduct: false };
	}

	changeImg = (img) => {this.setState({mainImg: img})}

	setAttr = (attr) => {
		this.setState({ ...this.state, attr: { ...this.state.attr, ...attr } });
	}

	addToCart = (brand, name, symbol, price, gallery, attributesAll) => {
		if (Object.keys(this.state.attr).length === attributesAll.length) {
			let order = {
				name,
				brand,
				symbol,
				price,
				attr: this.state.attr,
				gallery,
				attributesAll,
			};
			return this.props.giveToCart(order);
		} else {
			this.setState({ ...this.state, isAddedProduct: true });
		}
	};

	render() {
		const { data = {} } = this.props;
		const { product = {} } = data;
		const { gallery = [], attributes = [] } = product;
        let imgSrc = gallery? this.state.mainImg? this.state.mainImg: gallery[0]: "";
		return (
			<div className="container">
				<div className={cl.product__wrap}>
					<div className={cl.product__galery}>
						{gallery.map((img, index) => (
							<img
								key={index}
								src={img}
								alt="products"
								className={cl.img__item}
								onClick={(e) => this.changeImg(img, e)}
							/>
						))}
					</div>

					<div className={cl.product__box}>
						<img src={imgSrc} alt="photoMain" className={cl.photo}/>
						<div className={cl.info}>
							<div className={cl.tilte_wrap}>
								<h2 className={cl.brand}>{product.brand}</h2>
								<div className={cl.name}>{product.name}</div>
							</div>

							{attributes.map((attr, index) => (
								<div className={cl.attr__wrap} key={index}>
									<span className={cl.title__attr}>{attr.name}:</span>
									<div className={cl.attr__box}>
										{attr.items.map((item) => (
											<Radio
												id={`${item.value}${attr.name}`}
												name={attr.name}
												key={`${item.value}${attr.name}`}
												value={item.value}
												setAttr={this.setAttr}
											/>
										))}
									</div>
								</div>
							))}

							<div className={cl.price__wrap}>
								<span className={cl.title__price}>Price:</span>
								<div className={cl.amount}>
									{this.props.symbol}
									{product.prices
                                        ? product.prices.filter((cur) =>cur.currency.symbol === this.props.symbol)[0].amount
                                        : 0
                                    }
								</div>
							</div>

							<div className={cl.validateBlock}>
								<Button className={cl.button}
									    onClick={() => this.addToCart(
                                                                    product.brand,
                                                                    product.name,
                                                                    this.props.symbol,
                                                                    product.prices,
                                                                    gallery,
                                                                    attributes)}
								>
									ADD TO CART
								</Button>
								{this.state.isAddedProduct && Object.keys(this.state.attr).length !== attributes.length
                                    ? <div className={cl.validate}>Select all attributes!!! </div>
								    : ""
								}
							</div>

							<div className={cl.descr} dangerouslySetInnerHTML={{__html: product.description,}}></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default graphql(PRODUCTS, {
	options: (props) => ({
		variables: {
			id: props.id,
		},
	}),
})(Product);
