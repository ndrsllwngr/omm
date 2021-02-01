import React from "react";
import { ApolloProvider } from '@apollo/client'
import { useApollo } from "@/lib/apolloClient";


export const ApolloWrapper = ({ children, pageProps = { __APOLLO_STATE__: null} }) => {
const client = useApollo(pageProps)
  return (
  <ApolloProvider client={client}>{children}</ApolloProvider>
  )
}
