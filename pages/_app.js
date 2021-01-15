import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import AuthProvider from '@/components/context/authContext'
import { FabricProvider } from '@/components/context/fabricContext'
import { AutoplayProvider } from '@/components/context/autoplayContext'
import { FilterContextProvider } from '@/components/context/filterContext'
import { ReloadContextProvider } from '@/components/context/reloadContext'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthProvider>
        <ThemeProvider forcedTheme={Component.theme || undefined} attribute="class">
          <AutoplayProvider>
            <FilterContextProvider>
              <ReloadContextProvider>
                <FabricProvider>
                  <Component {...pageProps} />
                </FabricProvider>
              </ReloadContextProvider>
            </FilterContextProvider>
          </AutoplayProvider>
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
