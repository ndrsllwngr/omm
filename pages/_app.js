import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import AuthProvider from '@/components/context/authContext'
import { FabricProvider } from '@/components/context/fabricContext'
import { TemplateProvider } from '@/components/context/templateContext'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <TemplateProvider>
            <FabricProvider>
              <Component {...pageProps} />
            </FabricProvider>
          </TemplateProvider>
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
