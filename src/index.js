import {
  ApolloClient, ApolloProvider, gql, InMemoryCache
} from "@apollo/client";
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from "react-router-dom";
import App from './App';
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

const client = new ApolloClient({
  uri: 'http://localhost:4000/',
  cache: new InMemoryCache()
})

root.render(
  <React.StrictMode>
    <BrowserRouter>
        <ApolloProvider client={client}>
            <App/>
          </ApolloProvider>
    </BrowserRouter> 
  </React.StrictMode>
);

client
  .query({
    query: gql`
    query getProducts  {
		product(id : "apple-iphone-12-pro") {
			id
			name
			gallery
			description
			attributes{
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
    `
  })
  .then(result => console.log(result));
