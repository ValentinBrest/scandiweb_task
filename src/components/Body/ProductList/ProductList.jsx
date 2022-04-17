import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import cl from './ProductList.module.css'

class ProductList extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
                <div className={cl.prodList__wrap}>
                    <NavLink className={`${cl.productList__item}  ${this.props.inStock? '': cl.no__product}`} to={this.props.id}>
                        <div className={cl.img__box}>
                            <img className={cl.img__product} src={this.props.img} alt="product" />
                            <div className={cl.green__cart}></div>
                        </div>
                        
                        
                        <div className={cl.text}>
                            <div className={cl.brand}>{this.props.brand} {this.props.name}</div>

                            <div className={cl.price}>
                                {this.props.price.currency.symbol}{this.props.price.amount}
                            </div>
                        </div>
                    </NavLink>
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
