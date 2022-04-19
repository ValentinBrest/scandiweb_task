import React, { Component } from 'react';
import cl from './MinibagOrder.module.css';
import Attribute from './../Attribtute/Attribute';

class MinibagOrder extends Component {
    constructor(props){
        super(props)
        this.state = { count: 1}
    }
    increment = () => this.setState({...this.state, count: this.state.count + 1})

    decrement = () => this.setState({...this.state, count: this.state.count - 1})

    render() {
        return (
            <div className={cl.order__wrap} key={`${this.props.brand}${this.props.name}`}> 
                <div className={cl.left__info}>
                        <div className={cl.brand}>{this.props.brand}</div>
                        <div className={cl.name}>{this.props.name}</div>
                        <div className={cl.price}>
                                {this.props.symbol}
                                {this.props.price.filter(cur => cur.currency.symbol == this.props.symbol)[0].amount}
                        </div>
                        <div className={cl.attr__wrap}>
                            {this.props.attributesAll.map((attrItem, index)=> (
                                <Attribute key={index} name={attrItem.name} value={this.props.attr[attrItem.name].value}/>
                            ))}
                        </div>

                </div>
                <div className={cl.right__info}>
                    <div className={cl.button__wrap}>
                        <button className={cl.button}>
                            <div className={cl.button__plus} onClick={this.increment}></div>
                        </button>
                        <span>{this.state.count < 1 ? this.setState({count: 1}): this.state.count}</span>
                        <button className={cl.button}>
                            <div className={cl.button__minus} onClick={this.decrement}></div>
                        </button>
                    </div>

                    <div className={cl.img}>
                        <img src={this.props.gallery[0]} alt="photo" />
                    </div>
                </div>
                <button className={cl.button__delete}>&times;</button>
            </div>
        );
    }
}

export default MinibagOrder;
