import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

class NextSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head></Head>
        <body className="bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextSite
