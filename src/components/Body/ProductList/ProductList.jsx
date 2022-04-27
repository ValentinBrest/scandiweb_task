import React, { Component } from 'react';
import { NavLink, Route, Routes } from 'react-router-dom';
import cl from './ProductList.module.css'
import Product from './../../Product/Product'

class ProductList extends Component {
    constructor(props) {
        super(props)
    }

    addToCart = (brand, name, symbol, price, gallery) => {
        
            let order = {
                name,
                brand,
                symbol,
                price,
                gallery,
                attr: {},
                attributesAll: []
            }
            return this.props.giveToCart(order)
           
    }
    render() {
        return (
            <div className={cl.prodList__wrap}>
                    <NavLink className={`${cl.productList__item}  ${this.props.inStock? '': cl.no__product}`} to={this.props.id}>
                        <div className={cl.img__box}>
                            <img className={cl.img__product} src={this.props.img} alt="product" />
                            
                        </div>
                        
                        
                        <div className={cl.text}>
                            <div className={cl.brand}>{this.props.brand} {this.props.name}</div>

                            <div className={cl.price}>
                                {this.props.price.currency.symbol}{this.props.price.amount}
                            </div>
                        </div>
                    </NavLink>
                    <div className={cl.green__cart__box}>
                        <div className={cl.green__cart} onClick={this.props.attr.length == 0 ?(e) => this.addToCart(this.props.brand, this.props.name, this.props.symbol, this.props.prices, this.props.gallery): ''}></div>
                        <div className={cl.notice}>{this.props.attr.length == 0 ? <span>Click to add to cart</span>: <span>You need to select attributes to add to cart</span>}</div>
                    </div>
                    {this.props.inStock
                        ?<></>
                        :<div className={cl.noStock}>
                            <div className={cl.noStock__wrap}>
                                <span>OUT OF STOCK</span>
                            </div>
                        </div>
                    }
            </div>  
        );
    }
}

export default ProductList;
