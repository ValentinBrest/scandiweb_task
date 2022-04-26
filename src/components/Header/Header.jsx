
import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import Seclect from '../UI/Select/Seclect';
import { CATEGORIES_CURRENCIES } from './getCategoties';
import cl from './Header.module.css';
import Minibag from './MiniBag/MiniBag';


class Header extends Component {
    constructor(props){
        super(props)
    }

    switchMiniBag = (isMinibagOpen) => {
        this.props.openMinibag(isMinibagOpen)
    }

    // handleClick = (e) => {
    //     this.props.giveCurrency(e.target.value)
    // }

    

    render() {
        const {data = { }} = this.props
        const {categories = [], currencies = []} = data;
        
        return (
            <>
            <div className={cl.header}>
            <div className='container' >

                <div className={cl.header__wrap}>
                    <ul className={cl.categoties}>
                        {categories.map(item => (
                            <li key={item.name} className={cl.categoties_item}>
                                <NavLink to={item.name}  className={({ isActive }) => isActive ? cl.link_active : '' } onClick={() => this.switchMiniBag(false)}>{item.name}</NavLink>
                            </li>
                        ))}
                    </ul>

                    <div className={cl.wrap}>
                        {/* <select name="currency"  className={cl.currency} onChange={(e) => this.handleClick(e)}>
                            {currencies.map(cur => (
                                <option key={cur.symbol} value={cur.symbol} className={cl.option} >{cur.symbol}</option>
                            ))}
                        </select> */}
                        <Seclect currencies={currencies} getCurrency={this.props.getCurrency} symbol={this.props.symbol}/>
                        {/* <NavLink to='/cart' className={cl.cart} >
                            {this.props.totalProd > 0? <div className={cl.prod__total}>{this.props.totalProd}</div>: ''}
                        </NavLink> */}
                        <div className={cl.cart}  onClick={() => this.switchMiniBag(true)}>
                            {this.props.totalProd > 0? <div className={cl.prod__total}>{this.props.totalProd}</div>: ''}
                        </div>
                    </div>
                </div>

                {this.props.isMinibagOpen
                    ?<Minibag orders={this.props.orders} 
                            symbol={this.props.symbol} 
                            totalProd={this.props.totalProd}
                            switchMiniBag={this.switchMiniBag} 
                            addInCounters={this.props.addInCounters} 
                            counters={this.props.counters} 
                            updateOrders={this.props.updateOrders}
                            totalAmount={this.props.totalAmount}
                    />
                    : ''
                }
                
            </div>

            <div className={cl.logo} /><div/>
            
        </div>
                {this.props.isMinibagOpen
                    ?<div className={cl.overlay} onClick={() => this.switchMiniBag(false)} ></div>
                    :''
                }
            </>
            
        );
    }
}

export default graphql(CATEGORIES_CURRENCIES)(Header);



