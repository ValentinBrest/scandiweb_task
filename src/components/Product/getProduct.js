import { gql } from '@apollo/client';

export const PRODUCTS = gql`
    query getProducts($id: String!) {
        product(id: $id) {
            id
            name
            gallery
            inStock
            description
            attributes {
                id
                name
                type
                items {
                    displayValue
                    value
                    id
                }
            }
            prices {
                currency {
                    symbol
                }
                amount
            }
            brand
        }
    }
`;
