// import 'taiwindcss/tailwind.css'
import { Layout } from '@/components'
import '@/styles/globals.css'
import Head from 'next/head'

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>CMS Blog</title>
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}
