import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
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

type OrderListProps = {
  session: string;
  buyOrders: OrderByBusiness;
  sellOrders: OrderByBusiness;
};

type OrderByBusiness = {
  business: Business;
  orders: Order;
}[];

type Business = {
  id: string;
  name: string;
};

type Order = {
  id: string;
  status: 'CANCELED' | 'PENDING' | 'COMPLETED';
  total: number;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  buyerId: string;
  sellerId: string;
}[];

type Item = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    salePrice: number;
    listPrice: number;
    imageUrl: string;
  };
};

const OrderList = ({ buyOrders, sellOrders }: OrderListProps) => {
  const router = useRouter();
  const [viewMode, setViewMode] = useState('Compras');

  useEffect(() => {
    console.log(buyOrders);
    console.log(sellOrders);
  }, []);

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
              <Button
                width={viewMode === 'Compras' ? '100%' : '25%'}
                height="60px"
                fontSize="32px"
                bg={viewMode === 'Compras' ? 'default_orange' : 'secondary'}
                color={viewMode === 'Compras' ? 'default_white' : 'primary'}
                transition="0.2s ease-in-out"
                _hover={{
                  bg:
                    viewMode === 'Compras'
                      ? 'default_orange_hover'
                      : 'default_white_hover',
                }}
                borderRightRadius="0px"
                gap={5}
                onClick={() => setViewMode('Compras')}
              >
                <Icon as={FiGift}></Icon>
                {viewMode === 'Compras' ? 'Compras' : ''}
              </Button>
              <Button
                width={viewMode === 'Vendas' ? '100%' : '25%'}
                height="60px"
                fontSize="32px"
                bg={viewMode === 'Vendas' ? 'default_orange' : 'secondary'}
                color={viewMode === 'Vendas' ? 'default_white' : 'primary'}
                transition="0.2s ease-in-out"
                _hover={{
                  bg:
                    viewMode === 'Vendas'
                      ? 'default_orange_hover'
                      : 'default_white_hover',
                }}
                gap={5}
                borderLeftRadius="0px"
                onClick={() => setViewMode('Vendas')}
              >
                <Icon as={FiDollarSign}></Icon>
                {viewMode === 'Vendas' ? 'Vendas' : ''}
              </Button>
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
            margin="30px auto"
          >
            <Accordion allowMultiple marginBottom="60px" width="100%">
              {(viewMode === 'Compras' ? buyOrders : sellOrders).length > 0 ? (
                (viewMode === 'Compras' ? buyOrders : sellOrders).map(
                  (ordersForBusiness, key) => (
                    <AccordionItem
                      bg="primary"
                      borderRadius="15px"
                      marginBottom="20px"
                      border="1px solid #5647B2"
                      overflow="hidden"
                      key={key}
                    >
                      <AccordionButtonItems
                        icon={viewMode === 'Compras' ? FiGift : FiDollarSign}
                        type_name={ordersForBusiness.business.name}
                        color="secondary"
                      />
                      {ordersForBusiness.orders.map((order, orderKey) => (
                        <AccordionPanelOrder
                          key={orderKey}
                          orderId={order.id}
                          status={order.status}
                          total={order.total}
                          items={order.items}
                          orderType={viewMode}
                          bgColor="secondary"
                        />
                      ))}
                    </AccordionItem>
                  ),
                )
              ) : (
                <NoItemsText
                  color="primary"
                  text={`Nenhum pedido cadastrado como ${
                    viewMode === 'Compras' ? 'compra' : 'venda'
                  }.`}
                />
              )}
            </Accordion>
          </Flex>
        </Flex>
      </Flex>
      <FooterMenu />
    </>
  );
};

const getOrders = async (
  accountId: string,
  token: string,
  type: 'buy' | 'sell',
) => {
  try {
    const response = await api.get(`order/account/${accountId}`, {
      params: {
        type,
      },
      headers: {
        token,
      },
    });
    console.log(response.data[0]);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log(error);
    }
  }
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

  const { id } = jwt_decode(session) as {
    id: string;
  };

  const buyOrders = await getOrders(id, session, 'buy');
  const sellOrders = await getOrders(id, session, 'sell');

  return {
    props: { session, buyOrders, sellOrders },
  };
};

export default OrderList;
