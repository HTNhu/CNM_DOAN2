import React from 'react'
// import { ApolloProvider } from 'react-apollo'
// import { I18nextProvider } from 'react-i18next'
// import { Provider } from 'mobx-react'
// import { Provider as InnosProvider } from '@digihcs/innos-ui3'
// import './App.scss'
import Root from './page'
// import client from './tools/apollo'
// import i18n from './tools/i18n'
// import store from './tools/mobx'

function App() {
	return (
		// <Provider store={store}>
		// 	<InnosProvider theme="pharmacy">
		// 		<ApolloProvider client={client}>
		// 			<I18nextProvider i18n={i18n}>
						<Root />
		// 			</I18nextProvider>
		// 		</ApolloProvider>
		// 	</InnosProvider>
		// </Provider>
	)
}

export default App
