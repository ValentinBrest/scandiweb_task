import React, { Component } from 'react';
import Attribute from './Attribtute/Attribute';
import cl from './Order.module.css';
import mcl from './MinibagOrder.module.css'

class Order extends Component {
    constructor(props){
        super(props)
        this.state = { count: this.props.count,
                        startPrice: {},    
                        price: null,
                        mainImg : null,
                        indexImg: 0
                    }
    }
    // componentDidMount() {
    //     let money = {}
    //     this.props.price.forEach(cur => money[cur.currency.symbol] = cur.amount)
    //     this.setState({...this.state, startPrice: money}, () => {})
    // }

    increment = () => {
        let money = {}
        let count = this.state.count + 1
        this.props.price.forEach(cur => money[cur.currency.symbol] = count * cur.amount)
        
        this.setState({...this.state, count: count, price: money}, () => {
            this.props.addInCounters(this.state.count, this.props.index, money)
        })
        console.log(this.props.index);
    }
    
    decrement = () => {
        let money = {}
        let count = this.props.count - 1 <= 1 ? 1: this.props.count - 1
        if (this.state.count > 1){
            this.props.price.forEach(cur => money[cur.currency.symbol] = count * cur.amount)
            this.setState({...this.state, count: count, price: money}, () => {
                this.props.addInCounters(this.state.count, this.props.index, this.state.price)
            })
        } 
    }

    deleteProduct = (index) => {
        this.props.updateOrders(index)
    }
    componentDidUpdate(prevProps) {
        if (this.props.count !== prevProps.count) {
          this.setState({...this.state, count: this.props.count})
        }
      }

      changeImg (where) {
        let indexImg = where === "back" 
                ? this.state.indexImg == 0 
                    ? 0 :this.state.indexImg - 1 
                : this.state.indexImg + 1 > this.props.gallery.length-1 
                    ? this.props.gallery.length-1
                    : this.state.indexImg + 1 

        console.log(indexImg);
        
        this.setState({...this.state,
            mainImg: this.props.gallery[indexImg],
            indexImg: indexImg
        })
    }

    render() {
        let miniBag = this.props.miniBagOrder
        return (
            <div className={miniBag? mcl.order__wrap :cl.order__wrap } key={`${this.props.brand}${this.props.name}`}> 
                <div className={cl.left__info}>
                        <div className={miniBag? mcl.brand: cl.brand}>{this.props.brand}</div>
                        <div className={miniBag? mcl.name: cl.name}>{this.props.name}</div>
                        <div className={miniBag? mcl.price: cl.price}>
                                {this.props.symbol}
                                {this.props.price.filter(cur => cur.currency.symbol == this.props.symbol)[0].amount}
                        </div>
                        <div className={miniBag? mcl.attr__wrap: cl.attr__wrap}>
                            {this.props.attributesAll.map((attrItem, index)=> (
                                <Attribute key={index} 
                                            name={attrItem.name} 
                                            value={this.props.attr[attrItem.name].value} 
                                            miniBagOrder={this.props.miniBagOrder}
                                />
                            ))}
                        </div>

                </div>
                <div className={miniBag? mcl.right__info: cl.right__info}>
                    <div className={miniBag?mcl.button__wrap:cl.button__wrap}>
                        <button className={miniBag? mcl.button: cl.button}>
                            <div className={miniBag?mcl.button__plus:cl.button__plus} onClick={this.increment}></div>
                        </button>
                            <span>{this.props.count}</span>
                        <button className={miniBag? mcl.button: cl.button}>
                            <div className={miniBag? mcl.button__minus: cl.button__minus} onClick={this.decrement}></div>
                        </button>
                    </div>

                    <div className={miniBag? mcl.img__block: cl.img__block}>
                        {this.props.gallery.length > 1
                            ? <>
                                <div className={cl.arrow_left} onClick={()=> this.changeImg("back")}></div>  
                                <div className={cl.arrow_right} onClick={()=> this.changeImg("go")}></div>
                            </>
                            :''}       
                        <img src={this.state.mainImg ? this.state.mainImg : this.props.gallery[0]} alt="photo" />
                         
                    </div>
                </div>
                <button className={miniBag? mcl.button__delete:cl.button__delete} onClick={() => this.deleteProduct(this.props.index)}>&times;</button>
            </div>
        );
    }
}

export default Order;
