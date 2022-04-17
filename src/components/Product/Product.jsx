import React, { Component } from 'react';
import { compose } from 'recompose';
import { useMatcher } from '../../hoc/useMatcher';
import { PRODUCTS } from './getProduct';
import cl from './Product.module.css';
import { graphql } from '@apollo/client/react/hoc';
import { NavLink } from 'react-router-dom';
import Radio from '../UI/Radio/Radio';

class Product extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        const {data = {}} = this.props;
        const {product = {}} = data
        const {gallery = [], attributes = [], prices = [] } = product

        return (
            <div className="container">
                <div className={cl.product__wrap}>

                    <div className={cl.product__galery}>
                    {gallery.map((img, index) => (
                          <img key={index} src={img} alt="photo"/>  
                        ))}
                    </div>

                    <div className={cl.product__box}>
                        <img src={gallery[0]} alt="photo" className={cl.photo} />
                        <div className={cl.info}>
                            <div className={cl.tilte_wrap}>
                                <h2 className={cl.brand}>{product.brand}</h2>
                                <div className={cl.name}>{product.name}</div>
                            </div>

                            
                                {attributes.map((attr, index) => (
                                    <div className={cl.attr__wrap} key={index}>
                                        <span className={cl.title__attr}>{attr.name}:</span>
                                        <div className={cl.attr__box}>{attr.items.map((item, index) => (
                                            <>
                                            <Radio id={`${item.value}${attr.name}`} name={attr.name} key={product.id} value={item.value}/>
                                            {/* <>  
                                                <input type="radio" id={product.id} name={product.name} className={cl.attr__custom} />
                                                <label htmlFor={product.id} className={cl.label}>   
                                                    <span>{item.value}</span>
                                                </label>
                                            </> */}
                                            </>
                                        ))}
                                        </div>
                                    </div>
                                ))}
                                
                            

                            <div className={cl.price__wrap}>
                                <span className={cl.title__price}>Price:</span>
                                {/* <div className={cl.amount}>{prices[0].currency? prices[0].currency.symbol: '400'}{prices[0].amount}</div> */}
                                <div className={cl.amount}>$400</div>
                            </div>

                            <button className={cl.button}>ADD TO CART</button>

                            <div className={cl.descr}>{product.description}</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default compose(
    graphql(PRODUCTS,{
        options: props => ({
          variables: { 
            id: props.id,
            
          },
        }),
      }))(Product);

