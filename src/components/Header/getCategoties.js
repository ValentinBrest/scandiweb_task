import { gql } from '@apollo/client';

export const CATEGORIES_CURRENCIES = gql`
    query getCategories {
        categories {
            name
        }
        currencies {
            label
            symbol
        }
    }
`;
