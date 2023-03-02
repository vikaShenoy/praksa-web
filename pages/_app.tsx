import '@fontsource/lato'
import '@fontsource/proza-libre'
import type { Session } from 'next-auth'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Layout from '../components/layout/Layout'
import '../i18n/i18n'

function MyApp({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps<{ session: Session }>) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />;
      </Layout>
    </SessionProvider>
  )
}

export default MyApp
