import '@fontsource/lato'
import '@fontsource/proza-libre'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../i18n/i18n'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />;
    </Layout>
  )
}

export default MyApp
