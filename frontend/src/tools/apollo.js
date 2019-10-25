import { ApolloClient } from 'apollo-client'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { createHttpLink  } from 'apollo-link-http'

const cache = new InMemoryCache()

const Client = new ApolloClient({
  link: createHttpLink({ uri: 'http://localhost:3000/graphql' }),
  cache,
    defaultOptions: {
    //   mutate: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all'
    //   },
    //   query: {
    //     fetchPolicy: 'no-cache',
    //     errorPolicy: 'all'
    //   },
    //   watchQuery: {
    //     fetchPolicy: 'network-only',
    //     errorPolicy: 'ignore'
    //   }
    }
  })
  export { Client }