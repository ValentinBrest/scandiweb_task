import React, { Component } from 'react';
import { compose } from 'recompose';
import { useMatcher } from '../../hoc/useMatcher';
import { PRODUCTS } from './getProduct';
import cl from './Product.module.css';
import { graphql } from '@apollo/client/react/hoc';
import { NavLink } from 'react-router-dom';
import Radio from '../UI/Radio/Radio';
import { convertInHTML } from '../../utils/convertInHTML';
import Button from '../UI/Button/Button';

class Product extends Component {
    constructor(props) {
        super(props)
        this.state = { mainImg : null,
                        attr: {},
                        validate: true}
        this.changeImg = this.changeImg.bind(this)
        this.setAttr = this.setAttr.bind(this)
    }

    changeImg (img) {
        this.setState({
            mainImg: img
        })
    }

    setAttr(attr) {
        this.setState( {...this.state, attr: {...this.state.attr, ...attr}}, () => {})
    }

    addToCart = (brand, name, symbol, price, gallery, attributesAll) => {
        if (Object.keys(this.state.attr).length === attributesAll.length){
            let order = {
                name,
                brand,
                symbol,
                price,
                attr: this.state.attr,
                gallery,
                attributesAll,
            }
            this.setState({...this.state, validate: true})
            return this.props.giveToCart(order)
            
        } else {
            this.setState({...this.state, validate: false})
        }
        
        
    }

    render() {
        const {data = {}} = this.props;
        const {product = {}} = data
        const {gallery = [], attributes = []} = product;
        const description = convertInHTML(product.description)
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
                                            <Radio id={`${item.value}${attr.name}`} 
                                                    name={attr.name} 
                                                    key={`${item.value}${attr.name}`} 
                                                    value={item.value}
                                                    setAttr={this.setAttr}
                                            />
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

                            <div className={cl.validateBlock}>
                                <Button className={cl.button} onClick={() => this.addToCart(product.brand, product.name,this.props.symbol, product.prices, gallery, attributes)}>ADD TO CART</Button> 
                                {!this.state.validate
                                    ? <div className={cl.validate}>Select all attributes!!!</div>
                                    : ''
                                } 
                            </div>                       
                                          
                            {/* <button className={cl.button} 
                            onClick={() => this.addToCart(product.brand, product.name,this.props.symbol, product.prices, gallery, attributes)}>ADD TO CART</button> */}

                                              
                            <div className={cl.descr} dangerouslySetInnerHTML={{__html: product.description}}></div>
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

