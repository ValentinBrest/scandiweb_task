import React, { Component } from 'react';
import cl from './Radio.module.css';
import styled from 'styled-components'

const StyledLabel = styled.label `
    background: ${props => props.value};
    &:before {
        background: transparent;
    }
`

class Radio extends Component {
    
    render() {
        return (
            <>
                <input type="radio" id={this.props.id} name={this.props.name} className={this.props.name === 'Color' ? `${cl.custom__radio} ${cl.custom__color_radio}` : cl.custom__radio}/>
                <StyledLabel htmlFor={this.props.id} {...this.props}> 
                    <span>{this.props.name === 'Color' ? '' : this.props.value}</span>
                </StyledLabel>
            </>
        );
    }
}

export default Radio;
