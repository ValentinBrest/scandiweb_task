import React, { Component } from 'react';
import cl from './Select.module.css'

class Seclect extends Component {
    constructor(props){
        super(props)
        this.state = { isSelectOpen: false}
    }
    toggleSelect = (isSelectOpen) => {
        this.setState({isSelectOpen: isSelectOpen})
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.closeSelect);
        console.log('did');
      }
    
    componentWillUnmount() {
        document.removeEventListener('mousedown', this.closeSelect);
        console.log('will');
    }


    handleClick = (symbol) => {
        this.props.getCurrency(symbol)
        this.toggleSelect(false)
    }

    

    // closeSelect = () => {
    //     this.setState({isSelectOpen: true})
    // }

    render() {
        return (
            <div className={cl.select}>
                <div className={cl.header} onClick={() => {this.toggleSelect(this.state.isSelectOpen? false: true)}}>
                    <span className={cl.current}>{this.props.symbol}</span>
                    {
                        this.state.isSelectOpen
                        ? <div className={cl.icon__open}></div>
                        : <div className={cl.icon__close}></div>
                    }
                    
                    
                </div>
            
                {
                    this.state.isSelectOpen
                    ? <div className={cl.body}>
                    {this.props.currencies.map(cur => 
                        <div className={cl.item} key={cur.symbol} onClick={() => this.handleClick(cur.symbol)}><span>{cur.symbol}</span><span>{cur.label}</span></div>
                    )}
                    </div>
                    : ''
                }
                
                    
                    {/* <div className={cl.body}>
                    {this.props.currencies.map(cur => 
                        <div className={cl.item} key={cur.symbol} onClick={(e) => this.handleClick(cur.symbol, e)}><span>{cur.symbol}</span><span>{cur.label}</span></div>
                    )}
                    </div> */}
                    
                
                
            </div>
        );
    }
}

export default Seclect;
