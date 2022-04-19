import React, { Component } from 'react';
import cl from './Cart.module.css';
import Order from './Order/Order';

class Cart extends Component {
    render() {
        return (
            <div className="container">
                <div className={cl.title}>CART</div>
                {this.props.orders.map(order => (
                    <Order brand={order.brand} 
                            name={order.name} 
                            symbol={this.props.symbol} 
                            price={order.price}
                            attributesAll={order.attributesAll}
                            attr={order.attr}
                            gallery={order.gallery}
                    />
                ))}
            </div>
        );
    }
}

export default Cart;
