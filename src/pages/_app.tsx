import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import { Theme } from '../styles/theme';
import { SessionProvider } from 'next-auth/react';
import { ProductFormProvider } from '../context/product-form-context';
import { EstablishmentFormProvider } from '../context/establishment-form-context';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../../node_modules/video-react/dist/video-react.css';
import { CartProvider } from '../context/cart';
function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <ToastContainer />
      <CartProvider>
        <EstablishmentFormProvider>
          <ProductFormProvider>
            <SessionProvider>
              <ChakraProvider theme={Theme}>
                <Component {...pageProps} />
              </ChakraProvider>
            </SessionProvider>
          </ProductFormProvider>
        </EstablishmentFormProvider>
      </CartProvider>
    </>
  );
}

export default MyApp;
