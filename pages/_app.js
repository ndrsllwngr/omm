import React from 'react'
import { ApolloProvider } from '@apollo/client'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import { useApollo } from '@/lib/apolloClient'
import AuthProvider from '@/components/context/authContext'
import { FabricProvider } from '@/components/context/fabricContext'
import { AutoplayProvider } from '@/components/context/autoplayContext'
import { ViewsProvider } from '@/components/context/viewsContext'
import { SingleMemeProvider } from '@/components/context/singlememeContext'

// eslint-disable-next-line react/prop-types
export default function App({ Component, pageProps }) {
  const apolloClient = useApollo(pageProps)
  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        {/* eslint-disable-next-line react/prop-types */}
        <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
          <SingleMemeProvider>
            <AutoplayProvider>
              <ViewsProvider>
                <FabricProvider>
                  <Component {...pageProps} />
                </FabricProvider>
              </ViewsProvider>
            </AutoplayProvider>
          </SingleMemeProvider>
        </ThemeProvider>
      </AuthProvider>
    </ApolloProvider>
  )
}
