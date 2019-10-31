import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink  } from 'apollo-link-http'
import { setContext } from 'apollo-link-context';
const cache = new InMemoryCache()
const fetch = require('node-fetch')
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('token');
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});
const httpLink = createHttpLink(
  { uri: 'http://ec2-user@ec2-3-85-86-20.compute-1.amazonaws.com:3000/graphql' , 
  fetch, 
credentials: 'include'
})
const Client = new ApolloClient({
  link: authLink.concat(httpLink) ,
  cache,
    defaultOptions: {
      mutate: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      query: {
        fetchPolicy: 'no-cache',
        errorPolicy: 'all'
      },
      watchQuery: {
        fetchPolicy: 'network-only',
        errorPolicy: 'ignore'
      }
    }
  })
  export { Client }