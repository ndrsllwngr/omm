import React from 'react'
import App from 'next/app'
import { ThemeProvider } from 'next-themes'
import '@/styles/tailwind.css'
import { MemeProvider } from '@/components/context-meme'

class MyApp extends App {
  render() {
    const { Component, pageProps } = this.props
    return (
      <ThemeProvider attribute="class" defaultTheme="system">
        <MemeProvider>
          <Component {...pageProps} />
        </MemeProvider>
      </ThemeProvider>
    )
  }
}

export default MyApp
