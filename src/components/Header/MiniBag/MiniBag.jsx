import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Order from '../../Cart/Order/Order';
import Button from '../../UI/Button/Button';
import cl from './MiniBag.module.css';


class Minibag extends Component {
    constructor(props) {
        super(props)
        this.state= {miniBagOrder : true,
                    //  totalAmount: this.props.orders.length == 0 
                    //  ? 0
                    //  :+((this.props.orders.
                    //     map(item => item.price.
                    //     filter(cur => cur.currency.symbol == this.props.symbol)[0].amount)).
                    //     reduce(function(a, b){ return a + b}).toFixed(2))      
                     }
    }
    closeMiniBag = () => {
        this.props.switchMiniBag(false)
    }
    // getTotalAmount = (total) => {
    //     this.setState({...this.state, totalAmount: +((this.state.totalAmount + total).toFixed(2))}, ()=> {})
    // }
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
                            count={this.props.counters[index]}
                            addInCounters={this.props.addInCounters}
                            index={index}
                            totalAmount={this.props.totalAmount}
                    />
                    ))}
                </div>

                <div className={cl.total}>
                    <span>Total</span>
                    <span>{this.props.totalAmount}{this.props.symbol}</span>
                </div>

                <div className={cl.button__wrap}>
                    <NavLink to='/cart' onClick={this.closeMiniBag}>
                        <Button className={`${cl.button} ${cl.button__view}`}>View Bag</Button>
                    </NavLink>
                        <Button className={cl.button}>check out</Button>
                </div>
            </div>
        );
    }
}

export default Minibag;
