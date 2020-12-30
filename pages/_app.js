import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import AuthProvider from '@/components/context/authContext'
import { MemeProvider } from '@/components/context/memeContext'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <AuthProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <MemeProvider>
            <Component {...pageProps} />
          </MemeProvider>
        </ThemeProvider>
      </AuthProvider>
    )
  }
}

export default MyApp
