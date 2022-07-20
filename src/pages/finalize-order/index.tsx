import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormCitySelect } from '../../components/shared/form-city-select';
import { FormInput } from '../../components/shared/form-input';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { HeaderTitle } from '../../components/shared/header-title';
import { ListProductServiceCard } from '../../components/shared/list-product-service-card';
import { NoItemsText } from '../../components/shared/no-items-text';
import { api } from '../../service/api';
import { FiDollarSign, FiGift, FiPackage, FiSearch } from 'react-icons/fi';
import { FormProductServiceSearch } from '../../components/shared/form-product-service-search';
import { FooterMenu } from '../../components/shared/footer-menu';
import { DefaultHeader } from '../../components/shared/default-header';
import { ProductServiceListModal } from '../../components/shared/product-service-list-modal';
import jwt_decode from 'jwt-decode';
import axios from 'axios';
import { AccordionButtonItems } from '../../components/shared/accordion-button-items';
import { AccordionPanelOrder } from '../../components/order-list/accordion-panel-order';
import { BiMoney } from 'react-icons/bi';
import { FaRegMoneyBillAlt } from 'react-icons/fa';
import useCart from '../../hooks/cart';

const FinalizeOrder = () => {
  const cart = useCart();
  const router = useRouter();
  const [viewMode, setViewMode] = useState('Compras');

  return (
    <>
      <Flex minHeight="100vh" direction="column" bg="primary">
        <Flex id="headers">
          <Flex
            width="100%"
            maxW={{ base: '90%', md: '700px', lg: '900px' }}
            alignSelf="center"
            direction="column"
            margin="0px auto"
          >
            <DefaultHeader />
            <Flex justify="space-between" padding="40px 0px">
              <Text>Finalizar pedido</Text>
            </Flex>
          </Flex>
        </Flex>
        <Flex
          id="content"
          bg="secondary"
          height="100%"
          flex="1"
          borderTopRadius={{ base: '0px', md: '105px' }}
          paddingBottom={{ base: '80px', md: '0px' }}
        >
          <Flex
            width="100%"
            maxW={{ base: '90%', md: '700px', lg: '900px' }}
            margin="0px auto"
          >
            <Flex id="summary">
              <Text>Resumo</Text>
              <Flex id="summary-content">
                {cart.items.map((item, key) => (
                  <Text key={key}>{item.name}</Text>
                ))}{' '}
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <FooterMenu />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default FinalizeOrder;
