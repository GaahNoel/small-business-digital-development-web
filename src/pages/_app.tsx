import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '../styles/theme';
import { SessionProvider } from 'next-auth/react';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider theme={Theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </SessionProvider>
  );
}

export default MyApp;
