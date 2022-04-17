import React, { Component } from 'react';
import cl from './Radio.module.css'

class Radio extends Component {
    constructor(props){
        super(props)
    }
    render() {
        return (
            <>
                <input type="radio" id={this.props.id} name={this.props.name} className={cl.custom__radio}/>
                <label htmlFor={this.props.id} >   
                    <span>{this.props.value}</span>
                </label>
            </>
        );
    }
}

export default Radio;
