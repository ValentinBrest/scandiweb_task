import React, { Component } from 'react';
import cl from './Button.module.css'


class Button extends Component {
    render() {
        return (
            <button className={`${cl.button} ${this.props.className} `} onClick={this.props.onClick}>
                {this.props.children}
            </button>
        );
    }
}

export default Button;
