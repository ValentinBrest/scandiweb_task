import React, { Component } from 'react';
import { compose } from 'recompose';
import { useMatcher } from '../../hoc/useMatcher';
import { PRODUCTS } from './getProduct';
import cl from './Product.module.css';
import { graphql } from '@apollo/client/react/hoc';

class Product extends Component {
    render() {
        const {data = {}, match = {}} = this.props;
        // const {category = {}} = data
        return (
            <div className="container">
                <div className={cl.product__wrap}>

                    <div className={cl.product__galery}></div>

                    <div className={cl.product__box}>
                        <img src="/" alt="" className={cl.photo} />
                        <div className={cl.info}>
                            <div className={cl.tilte_wrap}>
                                <h2 className={cl.brand}></h2>
                                <div className={cl.name}></div>
                            </div>

                            <div className={cl.attr__wrap}>
                                <span className={cl.title}></span>
                                <div className={cl.attr__box}></div>
                            </div>

                            <div className={cl.price__wrap}>
                                <span className={cl.title}></span>
                                <div className={cl.amount}></div>
                            </div>

                            <button className={cl.button}>ADD TO CART</button>

                            <div className={cl.descr}></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default compose(useMatcher,
    graphql(PRODUCTS,{
        options: props => ({
          variables: { 
            id: props.match.params.name,
            
          },
        }),
      }))(Product);

