import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import AuthProvider from '@/components/context/authContext'
import { FabricProvider } from '@/components/context/fabricContext'
import { AutoplayProvider } from '@/components/context/autoplayContext'
import { FilterContextProvider } from '@/components/context/filterContext'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthProvider>
        <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
          <AutoplayProvider>
            <FilterContextProvider>
              <FabricProvider>
                <Component {...pageProps} />
              </FabricProvider>
            </FilterContextProvider>
          </AutoplayProvider>
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
