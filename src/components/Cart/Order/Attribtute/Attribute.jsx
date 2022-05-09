import React, { Component } from 'react';
import cl from './Attribute.module.css';
import mcl from './MinibagAttribute.module.css';
import styled from 'styled-components';

const StyledDiv = styled.div`
    background: ${(props) => props.value};
`;
class Attribute extends Component {
    getClassName = (classStyleName) => {
        let miniBag = this.props.miniBagOrder;
        return miniBag ? mcl[classStyleName] : cl[classStyleName];
    };
    render() {
        return (
            <div className={this.getClassName('attr')}>
                <div className={this.getClassName('attr__title')}>{this.props.name}:</div>
                <StyledDiv className={this.getClassName('attr__value')} {...this.props}>
                    <span>{this.props.name === 'Color' ? '' : this.props.value}</span>
                </StyledDiv>
            </div>
        );
    }
}

export default Attribute;
