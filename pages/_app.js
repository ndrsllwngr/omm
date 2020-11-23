import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import UserProvider from '@/components/context/userContext'
import { MemeProvider } from '@/components/context/memeContext'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <UserProvider>
        <ThemeProvider attribute="class" defaultTheme="system">
          <MemeProvider>
            <Component {...pageProps} />
          </MemeProvider>
        </ThemeProvider>
      </UserProvider>
    )
  }
}

export default MyApp
