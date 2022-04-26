import React, { Component } from 'react';
import cl from './Cart.module.css';
import Order from './Order/Order';

class Cart extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <div className="container">
                <div className={cl.title}>CART</div>
                {this.props.orders.map((order, index) => {
                    if (order) {
                        return <Order brand={order.brand} 
                            key = {index}
                            name={order.name} 
                            symbol={this.props.symbol} 
                            price={order.price}
                            attributesAll={order.attributesAll}
                            attr={order.attr}
                            gallery={order.gallery}
                            addInCounters={this.props.addInCounters} 
                            count={this.props.counters[index]}
                            index = {index}
                            updateOrders={this.props.updateOrders}
                    />
                    }
                })}
            </div>
        );
    }
}

export default Cart;
