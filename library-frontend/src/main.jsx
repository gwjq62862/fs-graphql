import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { ApolloClient, HttpLink, InMemoryCache } from '@apollo/client'
import { ALL_AUTHORS, ALL_BOOKS } from './query/query.js'
import { ApolloProvider } from '@apollo/client/react'


const client = new ApolloClient({
  link: new HttpLink({
    uri: 'http://localhost:4000',
  }),
  cache: new InMemoryCache(),
})




client.query({ query: ALL_AUTHORS }).then((response) => {
  console.log(response.data)
})
client.query({ query: ALL_BOOKS }).then((response) => {
  console.log(response.data)
})



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
  </StrictMode>
)
