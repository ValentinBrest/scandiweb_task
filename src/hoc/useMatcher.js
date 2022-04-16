import React, { Component } from 'react';
import { useMatch } from 'react-router-dom';

export const useMatcher = (Component) => {
    
    const ProductURLMatch = (props) => {
        const match = useMatch('/:name');
        return <Component {...props} match={match} />;
      }
    return ProductURLMatch
}