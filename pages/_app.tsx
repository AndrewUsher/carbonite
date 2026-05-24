import { ReactNode } from 'react'
import { Provider } from '../components/ui/provider'
import type { AppProps } from 'next/app'
import { Navigation } from '../components/Navigation'

function MyApp ({ Component, pageProps }: AppProps): ReactNode {
  return (
    <Provider>
      <Navigation />
      <Component {...pageProps} />
    </Provider>
  )
}

export default MyApp
