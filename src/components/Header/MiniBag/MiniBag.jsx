import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Order from '../../Cart/Order/Order';
import Button from '../../UI/Button/Button';
import cl from './MiniBag.module.css';


class Minibag extends Component {
    constructor(props) {
        super(props)
        this.state= {miniBagOrder : true}
    }
    render() {
        return (
            <div className={cl.minibag}>
                <div className={cl.title}>
                    <span><b>My Bag</b></span>
                    <span>{this.props.totalProd == 0 
                                ? ` is empty`
                                :this.props.totalProd > 1 ? `, ${this.props.totalProd} items`: `, 1 item`
                        }</span>
                </div>

                <div className={cl.bag_prod}>
                    {this.props.orders.map((order, index) => (
                        <Order key={index}
                            brand={order.brand} 
                            name={order.name} 
                            symbol={this.props.symbol} 
                            price={order.price}
                            attributesAll={order.attributesAll}
                            attr={order.attr}
                            gallery={order.gallery}
                            miniBagOrder={this.state.miniBagOrder}
                    />
                    ))}
                </div>

                <div className={cl.total}>
                    <span>Total</span>
                    <span>{this.props.symbol}</span>
                </div>

                <div className={cl.button__wrap}>
                    <NavLink to='/cart'>
                        <Button className={`${cl.button} ${cl.button__view}`}>View Bag</Button>
                    </NavLink>
                        <Button className={cl.button}>check out</Button>
                </div>
            </div>
        );
    }
}

export default Minibag;
