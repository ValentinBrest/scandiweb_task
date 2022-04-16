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
		category(input: {title : "all"}) {
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
    `
  })
  .then(result => console.log(result));
