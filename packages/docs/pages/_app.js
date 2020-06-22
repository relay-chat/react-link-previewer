import React from 'react'
import { MDXProvider } from '@mdx-js/react'
import { LinkPreview } from 'react-link-previewer'
import Link from 'next/link'
import 'typeface-inter'
import 'react-link-previewer/src/style.css'
import '../prism.css'
import '../styles.css'

const App = ({ Component, pageProps }) => {
  return (
    <>
      <header>
        <nav>
          <Link href="/">
            <a>Index</a>
          </Link>
          {' | '}
          <Link href="/example">
            <a>Live Example</a>
          </Link>
        </nav>
      </header>
      <MDXProvider
        components={{
          a: LinkPreview
        }}>
        <Component {...pageProps} />
      </MDXProvider>
    </>
  )
}

export default App
