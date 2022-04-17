import {gql} from "@apollo/client";

export const PRODUCTS_LIST = gql`
query getProducts ($pic: String!) {
  category(input: {title: $pic}) {
   products {
       id
       name
       brand
       inStock
       gallery
       prices{
         currency{
         label
         symbol
         }
         amount
       }
   }
 }
 }
`;