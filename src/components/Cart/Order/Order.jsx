import React, { Component } from 'react';
import Attribute from './Attribtute/Attribute';
import cl from './Order.module.css';
import mcl from './MinibagOrder.module.css'

class Order extends Component {
    constructor(props){
        super(props)
        this.state = { count: 1,}
    }
    increment = () => {
        this.setState({...this.state, count: this.state.count + 1}, () => {
            this.countTotal((this.props.price.filter(cur => cur.currency.symbol == this.props.symbol)[0].amount))
        })
    }
    
    decrement = () => {
        let one = this.state.count - 1 <= 1 ? 1: this.state.count - 1
        if (this.state.count > 1){
            this.setState({...this.state, count: one}, () => {
                this.countTotal(-(this.props.price.filter(cur => cur.currency.symbol == this.props.symbol)[0].amount))
            })
        } 
         
    }

    countTotal = (total) => {
        this.props.getTotalAmount(total)
    }

    render() {
        let miniBag = this.props.miniBagOrder
        return (
            <div className={miniBag? mcl.order__wrap :cl.order__wrap } key={`${this.props.brand}${this.props.name}`}> 
                <div className={cl.left__info}>
                        <div className={miniBag? mcl.brand: cl.brand}>{this.props.brand}</div>
                        <div className={miniBag? mcl.name: cl.name}>{this.props.name}</div>
                        <div className={miniBag? mcl.price: cl.price}>
                                {this.props.symbol}
                                {this.props.price.filter(cur => cur.currency.symbol == this.props.symbol)[0].amount}
                        </div>
                        <div className={miniBag? mcl.attr__wrap: cl.attr__wrap}>
                            {this.props.attributesAll.map((attrItem, index)=> (
                                <Attribute key={index} 
                                            name={attrItem.name} 
                                            value={this.props.attr[attrItem.name].value} 
                                            miniBagOrder={this.props.miniBagOrder}
                                />
                            ))}
                        </div>

                </div>
                <div className={miniBag? mcl.right__info: cl.right__info}>
                    <div className={miniBag?mcl.button__wrap:cl.button__wrap}>
                        <button className={miniBag? mcl.button: cl.button}>
                            <div className={miniBag?mcl.button__plus:cl.button__plus} onClick={this.increment}></div>
                        </button>
                        <span>{this.state.count < 1 ? this.setState({count: 1}): this.state.count}</span>
                        <button className={miniBag? mcl.button: cl.button}>
                            <div className={miniBag? mcl.button__minus: cl.button__minus} onClick={this.decrement}></div>
                        </button>
                    </div>

                    <div className={miniBag? mcl.img: cl.img}>
                        <img src={this.props.gallery[0]} alt="photo" />
                    </div>
                </div>
                <button className={miniBag? mcl.button__delete:cl.button__delete} onClick={() => console.log('dd')}>&times;</button>
            </div>
        );
    }
}

export default Order;
