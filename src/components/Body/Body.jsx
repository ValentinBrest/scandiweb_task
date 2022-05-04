import { graphql } from '@apollo/client/react/hoc';
import React, { Component } from 'react';
import { Outlet, Route, Routes } from 'react-router-dom';
import Product from '../Product/Product';
import cl from './Body.module.css';
import { PRODUCTS_LIST } from './getProductList';
import ProductList from './ProductList/ProductList';

class Body extends Component {
    render() {
        const {data = {}} = this.props;
        const {category = {}} = data;
        const {products = []} = category;
        return (
            <>
                {/* <Routes>
                    {products.map((item) => (
                        <Route  key={`${item.name}${item.id}`}
                                path={`:${item.id}`}
                                element={ <Product
                                            id={item.id}
                                            symbol={this.props.symbol}
                                            giveToCart={this.props.giveToCart}
                                        />
                                }
                        />
                    ))}
                </Routes> */}
                <div className={cl.wrapper}>
                
                <div className="container">
                    <h1 className={cl.title}>{this.props.name}</h1>

                    <div className={cl.body_wrap}>
                    
                        {products.map( prod => (
                                        <ProductList 
                                            key={prod.name}
                                            id={prod.id} 
                                            brand={prod.brand} 
                                            inStock={prod.inStock} 
                                            name={prod.name} 
                                            img={prod.gallery[0]}
                                            price={prod.prices.filter(cur => cur.currency.symbol === this.props.symbol)[0]}
                                            prices={prod.prices}
                                            attr={prod.attributes}
                                            giveToCart={this.props.giveToCart}
                                            gallery = {prod.gallery}
                                            symbol={this.props.symbol}
                                        />
                                    ))
                        }
                        
                    </div>
                </div>
                
            </div>
            </>
            
            
        );
    }
}

export default 
    graphql(PRODUCTS_LIST,{
        options: props => ({
          variables: { 
            pic: props.name
          },
        }),
    })(Body);
