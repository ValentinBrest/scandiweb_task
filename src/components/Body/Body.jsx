import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { useMatcher } from '../../hoc/useMatcher';
import cl from './Body.module.css'
import { PRODUCTS } from './getProduct';
import Product from './Product/Product';

class Body extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {data = {}, match = {}} = this.props;
        const {category = {}} = data
        const {products = []} = category
        return (
            <div>
                <div className="container">
                    <h1 className={cl.title}>Category name</h1>

                    <div className={cl.product_wrap}>
                        { products.map( prod => (
                            <Product key={prod.id} 
                                    brand={prod.brand} 
                                    isStock={prod.isStock} 
                                    name={prod.name} 
                                    img={prod.gallery[0]}
                                    prices={prod.prices[0]}>
                            </Product>
                        ))
                        }
                        
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
            pic: props.match.params.name,
          },
        }),
      }))(Body);
