import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '../styles/theme';
import 'react-toastify/dist/ReactToastify.css';
import { SessionProvider } from 'next-auth/react';
import { ProductFormProvider } from '../context/product-form-context';
import { EstablishmentFormProvider } from '../context/establishment-form-context';
import { ToastContainer } from 'react-toastify';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <EstablishmentFormProvider>
        <ProductFormProvider>
          <SessionProvider>
            <ChakraProvider theme={Theme}>
              <Component {...pageProps} />
            </ChakraProvider>
          </SessionProvider>
        </ProductFormProvider>
      </EstablishmentFormProvider>
    </>
  );
}

export default MyApp;
