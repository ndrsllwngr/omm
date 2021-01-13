import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import AuthProvider from '@/components/context/authContext'
import { FabricProvider } from '@/components/context/fabricContext'
import { AutoplayProvider } from '@/components/context/autoplayContext'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <AutoplayProvider>
            <FabricProvider>
              <Component {...pageProps} />
            </FabricProvider>
          </AutoplayProvider>
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
