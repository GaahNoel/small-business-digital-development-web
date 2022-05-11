import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '../styles/theme';
import { SessionProvider } from 'next-auth/react';
import { ProductFormProvider } from '../context/product-form-context';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProductFormProvider>
      <SessionProvider>
        <ChakraProvider theme={Theme}>
          <Component {...pageProps} />
        </ChakraProvider>
      </SessionProvider>
    </ProductFormProvider>
  );
}

export default MyApp;
