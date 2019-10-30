import React from 'react'
import { ApolloProvider } from '@apollo/react-hooks'
// import { hot } from 'react-hot-loader/root'
import ApolloClient from 'apollo-boost'
import { BrowserRouter
} from 'react-router-dom'
import Root from './page';
function App() {
	const client = new ApolloClient({
		uri: 'http://ec2-3-85-86-20.compute-1.amazonaws.com:3000/graphql'
	});
	return (
		<ApolloProvider client={client}>
        <BrowserRouter>
          <Root />
        </BrowserRouter>
      </ApolloProvider>

	)
}
export default App
