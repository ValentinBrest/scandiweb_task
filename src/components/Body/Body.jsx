import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import compose from 'recompose/compose';
import { useMatcher } from '../../hoc/useMatcher';
import Header from '../Header/Header';
import ProductList from './ProductList/ProductList';
import cl from './Body.module.css';
import { PRODUCTS_LIST } from './getProductList';


class Body extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const {data = {}, match = {}} = this.props;
        const {category = {}} = data;
        const {products = []} = category;
        return (
            <div className={cl.wrapper}>
                <div className="container">
                    <h1 className={cl.title}>Category name</h1>

                    <div className={cl.body_wrap}>
                    
                    {
                        products.map( prod => (
                                    <ProductList 
                                        key={prod.name}
                                        id={prod.id} 
                                        brand={prod.brand} 
                                        inStock={prod.inStock} 
                                        name={prod.name} 
                                        img={prod.gallery[0]}
                                        price={prod.prices.filter(cur => cur.currency.symbol == this.props.symbol)[0]}>
                                    </ProductList>
                                ))
                        }
                        
                    </div>
                </div>
                {this.props.isMinibagOpen
                    ?<div className={cl.overlay}></div>
                    :''
                }
                
            </div>
            
        );
    }
}


export default compose(useMatcher,
    graphql(PRODUCTS_LIST,{
        options: props => ({
          variables: { 
            pic: props.match == null ? 'all': props.match.params.name,
            
          },
        }),
      }))(Body);
