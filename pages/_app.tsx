import { ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Provider } from 'next-auth/client'
import { Navigation } from '../components/Navigation'

function MyApp ({ Component, pageProps }: AppProps): ReactNode {
  return (
    <Provider session={pageProps.session}>
      <ChakraProvider>
        <Navigation />
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  )
}

export default MyApp
