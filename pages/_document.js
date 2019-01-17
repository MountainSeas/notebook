import Document, { Head, Main, NextScript } from 'next/document'


export default class MyDocument extends Document {
  render () {
    return (
      <html>
        <Head>
          <meta charSet="utf-8" />
          {/* <link rel="stylesheet" href="/_next/static/style.css" /> */}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    )
  }
}