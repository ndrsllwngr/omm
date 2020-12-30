import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class NextSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head />
        <body className="antialiased font-sans bg-gray-200">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextSite
