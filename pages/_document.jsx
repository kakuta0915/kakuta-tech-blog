import React from 'react'
import Document, { Html, Head, Main, NextScript } from 'next/document'
import { siteMeta } from '@/libs/constants'
const { siteLang } = siteMeta
export default class MyDocument extends Document {
  render() {
    return (
      <Html lang={siteLang}>
        <Head />
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    )
  }
}
