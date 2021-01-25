import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import AuthProvider from '@/components/context/authContext'
import { FabricProvider } from '@/components/context/fabricContext'
import { AutoplayProvider } from '@/components/context/autoplayContext'
import { ViewsProvider } from '@/components/context/viewsContext'
import { SingleMemeProvider } from '@/components/context/singlememeContext'
class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthProvider>
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
    )
  }
}

export default MyApp
