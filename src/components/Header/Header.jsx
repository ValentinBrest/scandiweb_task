
import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import { CATEGORIES_CURRENCIES } from './getCategoties';
import cl from './Header.module.css';


class Header extends Component {
    constructor(props){
        super(props)
    }

    handleClick = (e) => {
        this.props.giveCurrency(e.target.value)
    }
    render() {
        const {data = { }} = this.props
        const {categories = [], currencies = []} = data
        return (
            <div className={cl.header}>
                <div className='container' >

                    <div className={cl.header__wrap}>
                        <ul className={cl.categoties}>
                            {categories.map(item => (
                                <li key={item.name} className={cl.categoties_item}>
                                    <NavLink to={item.name}  className={({ isActive }) => isActive ? cl.link_active : ''} >{item.name}</NavLink>
                                </li>
                            ))}
                        </ul>

                        <div className={cl.wrap}>
                            <select name="currency"  className={cl.currency} onChange={(e) => this.handleClick(e)}>
                                {currencies.map(cur => (
                                    <option key={cur.symbol} value={cur.symbol} className={cl.option} >{cur.symbol}</option>
                                ))}
                            </select>
                            <div className={cl.cart}></div>
                        </div>
                    </div>
                </div>

                <div className={cl.logo} /><div/>
            </div>
        );
    }
}

export default graphql(CATEGORIES_CURRENCIES)(Header);



