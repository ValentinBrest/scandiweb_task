import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import compose from 'recompose/compose';
import { useMatcher } from '../../hoc/useMatcher';
import Header from '../Header/Header';
import Product from '../Product/Product';
import cl from './Body.module.css';
import { PRODUCTS_LIST } from './getProductList';
import ProductList from './ProductList/ProductList';

class Body extends Component {
    
    constructor(props) {
        super(props)
        this.state = { curPrice: '$'}
    }

    giveCurrency = (curPrice) => {
        this.setState({curPrice})
    }


    render() {
        const {data = {}, match = {}} = this.props;
        const {category = {}} = data
        const {products = []} = category
        return (
            <div>
                {/* <Header giveCurrency={this.giveCurrency}/> */}
                <div className="container">
                    <h1 className={cl.title}>Category name</h1>

                    <div className={cl.body_wrap}>
                        { 
                         products.map( prod => (
                            <ProductList key={prod.id}
                                    id={prod.id} 
                                    brand={prod.brand} 
                                    inStock={prod.inStock} 
                                    name={prod.name} 
                                    img={prod.gallery[0]}
                                    price={prod.prices.filter(cur => cur.currency.symbol == this.state.curPrice)[0]}>
                            </ProductList>
                        ))
                        }
                        
                    </div>
                </div>
                <Product/>
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