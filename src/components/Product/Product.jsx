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

        this.state = { mainImg : null }
        this.changeImg = this.changeImg.bind(this)
    }

    changeImg (img) {
        this.setState({
            mainImg: img
        })
    }
    render() {
        const {data = {}} = this.props;
        const {product = {}} = data
        const {gallery = [], attributes = []} = product
        
        return (
            <div className="container">
                <div className={cl.product__wrap}>

                    <div className={cl.product__galery}>
                    {gallery.map((img, index) => (
                          <img key={index} src={img} alt="photo" className={cl.img__item} onClick={(e)=> this.changeImg(img, e)}/>  
                        ))}
                    </div>

                    <div className={cl.product__box}>
                        <img src={gallery ? this.state.mainImg ? this.state.mainImg : gallery[0]: ''} alt="photo" className={cl.photo} />
                        <div className={cl.info}>
                            <div className={cl.tilte_wrap}>
                                <h2 className={cl.brand}>{product.brand}</h2>
                                <div className={cl.name}>{product.name}</div>
                            </div>

                            
                                {attributes.map((attr, index) => (
                                    <div className={cl.attr__wrap} key={index}>
                                        <span className={cl.title__attr}>{attr.name}:</span>
                                        <div className={cl.attr__box}>{attr.items.map(item => (
                                            <Radio id={`${item.value}${attr.name}`} name={attr.name} key={`${item.value}${attr.name}`} value={item.value}/>
                                        ))}
                                        </div>
                                    </div>
                                ))}
                                
                            

                            <div className={cl.price__wrap}>
                                <span className={cl.title__price}>Price:</span>
                                <div className={cl.amount}>
                                    {this.props.symbol}
                                    {product.prices? product.prices.filter(cur => cur.currency.symbol == this.props.symbol)[0].amount: 0}
                                </div>
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

