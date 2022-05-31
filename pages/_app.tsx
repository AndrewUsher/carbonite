import { ReactNode } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import type { AppProps } from 'next/app'
import { Navigation } from '../components/Navigation'

function MyApp ({ Component, pageProps }: AppProps): ReactNode {
  return (
    <ChakraProvider>
      <Navigation />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
