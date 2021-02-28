import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'

/*
Class provided by Next.
Wrapper for global html head elements
 */
class NextSite extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href={`/assets/favicon/${
              process.env.NEXT_PUBLIC_DEV_MODE === 'true' ? 'dev/' : ''
            }apple-touch-icon.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`/assets/favicon/${
              process.env.NEXT_PUBLIC_DEV_MODE === 'true' ? 'dev/' : ''
            }favicon-32x32.png`}
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href={`/assets/favicon/${
              process.env.NEXT_PUBLIC_DEV_MODE === 'true' ? 'dev/' : ''
            }favicon-16x16.png`}
          />
          <link
            rel="manifest"
            href={`/assets/favicon/${
              process.env.NEXT_PUBLIC_DEV_MODE === 'true' ? 'dev/' : ''
            }site.webmanifest`}
          />
        </Head>
        <body className="antialiased font-sans dark:bg-custom-gray bg-white">
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}

export default NextSite
