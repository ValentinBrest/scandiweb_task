import React, { Component } from 'react';
import cl from './Attribute.module.css';
import mcl from './MinibagAttribute.module.css';
import styled from 'styled-components';

const StyledDiv = styled.div `
    background: ${props => props.value};
    
`
class Attribute extends Component {
    constructor(props){
        super(props)
    }
    render() {
        let miniBag = this.props.miniBagOrder
        return (
            <div className={miniBag? mcl.attr: cl.attr} >
                <div className={miniBag? mcl.attr__title: cl.attr__title}>{this.props.name}:</div>
                    <StyledDiv className={miniBag? mcl.attr__value: cl.attr__value} {...this.props}>
                        <span >{this.props.name === 'Color' ? '' : this.props.value}</span>
                    </StyledDiv>
            </div>
        );
    }
}

export default Attribute;
