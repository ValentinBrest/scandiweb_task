import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './Product.module.css'

class Product extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
        <>
            <NavLink className={cl.product__item} to={this.props.name}>
                <div className={cl.img__box}>
                    <img className={cl.img__product} src={this.props.img} alt="product" />
                    <div className={cl.green__cart}></div>
                </div>
                
                
                <div className={cl.text}>
                    <div className={cl.brand}>{this.props.brand} {this.props.name}</div>

                    <div className={cl.price}>
                        {this.props.prices.currency.symbol}{this.props.prices.amount}
                    </div>
                </div>
            </NavLink>
        </>
            
        );
    }
}

export default Product;
