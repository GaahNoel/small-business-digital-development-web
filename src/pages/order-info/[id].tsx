import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Checkbox,
  Collapse,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  NumberInput,
  Spinner,
  Text,
  Textarea,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { useRouter } from 'next/router';
import React, { MutableRefObject, useEffect, useRef, useState } from 'react';
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
import { useCart } from '../../hooks/cart';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { FiCreditCard, FiDollarSign } from 'react-icons/fi';
import { ButtonCheckbox } from '../../components/finalize-order/button-checkbox';
import { BsCashStack } from 'react-icons/bs';
import { NoItemsText } from '../../components/shared/no-items-text';
import { UserInput } from '../../components/shared/user-input';
import { MdOutlineLock } from 'react-icons/md';
import CurrencyInput from 'react-currency-input-field';
import Swal from 'sweetalert2';
import { api } from '../../service/api';
import { getToken, JWT } from 'next-auth/jwt';
import * as jwt from 'jsonwebtoken';
import BusinessItems from '../business-items/[id]';
import { User } from 'next-auth';
import { userInfo } from 'os';
import { OrderMapInput } from '../../components/finalize-order/order-map-input';
import { OrderMapView } from '../../components/order-info/order-map-view';
import { positionstackApi } from '../../service/positionstack-api';

type ParamsProps = {
  id: string;
};

type OrderInfoProps = {
  orderId: string;
  token: string;
  id: string;
  orderInfo: OrderInfo;
  businessInfo: BusinessInfo;
  usersInfo: FormatedUserInfo;
};

type UserInfo = {
  name: string;
  email: string;
  verified: boolean;
  provider: string;
};

type FormatedUserInfo = {
  buyer: {
    email: string;
    location: {
      country: string;
      region: string;
      county: string;
      street: string | null;
      name: string | null;
    };
  };
  seller: {
    email: string;
  };
};

type OrderInfo = {
  id: string;
  status: Status;
  total: number;
  businessId: string;
  buyerId: string;
  sellerId: string;
  items: Items;
  createdAt: string;
  updatedAt: string;
  description: string;
  paymentMethod: string;
  change: number;
  buyerStatus: Status;
  sellerStatus: Status;
  latitude: number;
  longitude: number;
};

type Items = {
  id: string;
  quantity: number;
  product: Product;
}[];

type Product = {
  id: string;
  name: string;
  description: string;
  salePrice: number;
  listPrice: number;
  imageUrl: string;
};

type Status = 'CANCELED' | 'PENDING' | 'COMPLETED';

type AllStatus = { general: Status; buyer: Status; seller: Status };

type BusinessInfo = {
  id: string;
  name: string;
  description: string;
  accountId: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

type LocationProps = {
  lat: string;
  lng: string;
};

const OrderInfo = ({
  orderId,
  token,
  id,
  orderInfo,
  businessInfo,
  usersInfo,
}: OrderInfoProps) => {
  const router = useRouter();
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };
  const statusFormat = {
    CANCELED: {
      color: 'error_red',
      text: 'Cancelado',
    },
    PENDING: {
      color: 'default_yellow',
      text: 'Pendente',
    },
    COMPLETED: {
      color: 'success_green',
      text: 'Finalizado',
    },
    PENDING_SELLER: {
      color: 'default_yellow',
      text: 'Pendente, aguarde o vendendor confirmar a solicitação de ',
    },
    PENDING_BUYER: {
      color: 'default_yellow',
      text: 'Pendente, aguarde o comprador confirmar a solicitação de ',
    },
  };
  const [changeStatusLoading, setChangeStatusLoading] = useState('NONE');
  const [allStatus, setAllStatus] = useState<AllStatus>({
    general: 'PENDING',
    buyer: 'PENDING',
    seller: 'PENDING',
  });

  const [userRole, setUserRole] = useState<'buyer' | 'seller'>('buyer');

  useEffect(() => {
    setAllStatus({
      general: orderInfo.status,
      buyer: orderInfo.buyerStatus,
      seller: orderInfo.sellerStatus,
    });
    if (id === orderInfo.buyerId) {
      setUserRole('buyer');
    }
    if (id === orderInfo.sellerId) {
      setUserRole('seller');
    }
  }, []);

  const cancelOrder = () => {
    Swal.fire({
      title: 'Tem certeza que deseja cancelar o pedido?',
      showDenyButton: true,
      confirmButtonText: 'Não',
      denyButtonText: `Sim`,
    }).then((result) => {
      if (!result.isConfirmed) {
        changeStatus('CANCELED');
      }
    });
  };

  const confirmOrder = () => {
    Swal.fire({
      title: 'O pedido/serviço já foi concluído? Se sim, clique em finalizar',
      showDenyButton: true,
      confirmButtonText: 'Finalizar',
      denyButtonText: `Não`,
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        changeStatus('COMPLETED');
      }
    });
  };

  const changeStatus = async (status: Status) => {
    setChangeStatusLoading(status);
    try {
      await api.put(
        `order/edit/status/${orderInfo.id}`,
        {
          status,
        },
        {
          headers: {
            token,
          },
        },
      );
      if (userRole === 'buyer')
        setAllStatus({
          ...allStatus,
          buyer: status,
        });
      else {
        setAllStatus({
          ...allStatus,
          seller: status,
        });
      }
      const statusChange =
        status === orderInfo.buyerStatus || status === orderInfo.sellerStatus;
      if (statusChange || status === 'CANCELED')
        setAllStatus({
          ...allStatus,
          general: status,
        });
    } catch (error) {
      console.log(error);
    } finally {
      setChangeStatusLoading('NONE');
    }
  };

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
            <Flex
              color={statusFormat[allStatus.general].color}
              fontWeight="medium"
              fontSize={{ base: '30px', sm: '36px', md: '38px', xl: '42px' }}
              justify="center"
              direction="column"
              padding="40px 0px"
            >
              <Text color="default_white">{orderInfo.id}</Text>
              <Text>{statusFormat[allStatus.general].text}</Text>
            </Flex>
            {allStatus.general === 'PENDING' &&
              allStatus[userRole] === 'PENDING' && (
                <Flex width="100%" justify="end" margin="20px 0 40px 0">
                  <Flex
                    width={{ base: '100%', sm: '50%' }}
                    justify="space-between"
                  >
                    <Button
                      bg="error_red"
                      _hover={{ bg: 'error_red_hover' }}
                      color="default_white"
                      width="45%"
                      height="60px"
                      fontSize={{
                        base: '18px',
                        sm: '13px',
                        md: '20px',
                        lg: '22px',
                      }}
                      onClick={cancelOrder}
                      disabled={changeStatusLoading !== 'NONE'}
                    >
                      {changeStatusLoading !== 'CANCELED' ? (
                        <Text>Cancelar</Text>
                      ) : (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="default_white"
                          size="md"
                        />
                      )}
                    </Button>
                    <Button
                      bg="primary"
                      border="1px solid"
                      borderColor="default_white"
                      _hover={{ bg: 'primary_hover' }}
                      color="default_white"
                      width="45%"
                      height="60px"
                      fontSize={{
                        base: '18px',
                        sm: '13px',
                        md: '20px',
                        lg: '22px',
                      }}
                      onClick={confirmOrder}
                      disabled={changeStatusLoading !== 'NONE'}
                    >
                      {changeStatusLoading !== 'COMPLETED' ? (
                        <Text>Finalizar</Text>
                      ) : (
                        <Spinner
                          thickness="4px"
                          speed="0.65s"
                          emptyColor="gray.200"
                          color="default_white"
                          size="md"
                        />
                      )}
                    </Button>
                  </Flex>
                </Flex>
              )}
            {allStatus.general === 'PENDING' &&
              allStatus[userRole] !== 'PENDING' && (
                <Flex
                  justify="center"
                  color={statusFormat[allStatus.general].color}
                  paddingBottom="45px"
                  fontSize={{
                    base: '14px',
                    sm: '16px',
                    md: '18px',
                    xl: '22px',
                  }}
                >
                  <Text>{`Aguardando validação por parte do ${
                    userRole === 'buyer' ? 'vendedor' : 'comprador'
                  }`}</Text>
                </Flex>
              )}
          </Flex>
        </Flex>
        <Flex
          id="content"
          bg="secondary"
          direction="column"
          width="100%"
          height="100%"
          flex="1"
          borderTopRadius={{ base: '0px', md: '105px' }}
          paddingBottom={{ base: '80px', md: '0px' }}
        >
          <Flex
            width="100%"
            maxW={{ base: '90%', md: '700px', lg: '900px' }}
            direction="column"
            margin="30px auto 0px auto"
          >
            <Flex id="contact" direction="column" width="100%">
              <Text
                color="primary"
                fontSize={{
                  base: '20px',
                  sm: '26px',
                  md: '32px',
                  xl: '36px',
                }}
                fontWeight="medium"
              >
                Contato
              </Text>
              <Text
                color="primary"
                fontSize={{
                  base: '15px',
                  md: '18px',
                  lg: '20px',
                  '2xl': '22px',
                }}
              >
                {`Comprador: ${usersInfo.buyer.email}`}
              </Text>
              <Text
                color="primary"
                fontSize={{
                  base: '15px',
                  md: '18px',
                  lg: '20px',
                  '2xl': '22px',
                }}
              >
                {`Vendedor: ${usersInfo.seller.email}`}
              </Text>
            </Flex>
          </Flex>
          <Flex
            width="100%"
            maxW={{ base: '90%', md: '700px', lg: '900px' }}
            direction="column"
            margin="0px auto"
          >
            <Flex
              id="map-input"
              direction="column"
              width="100%"
              marginTop="30px"
            >
              <Text
                color="primary"
                fontSize={{
                  base: '20px',
                  sm: '26px',
                  md: '32px',
                  xl: '36px',
                }}
                fontWeight="medium"
              >
                Localização
              </Text>
              {usersInfo && businessInfo && (
                <Flex
                  width="100%"
                  fontSize={{
                    base: '15px',
                    md: '18px',
                    lg: '20px',
                    '2xl': '22px',
                  }}
                  justify="space-between"
                  color="primary"
                >
                  <Flex direction="column" width="45%">
                    <Text fontWeight="medium">Comprador</Text>
                    <Text>Estado: {usersInfo.buyer.location.region}</Text>
                    <Text>
                      Cidade:{' '}
                      {usersInfo.buyer.location.country &&
                      usersInfo.buyer.location.county ===
                        usersInfo.buyer.location.country
                        ? usersInfo.buyer.location.region
                        : usersInfo.buyer.location.county}
                    </Text>
                    {usersInfo.buyer.location.street && (
                      <Text>
                        Localização: {usersInfo.buyer.location.street}
                      </Text>
                    )}
                  </Flex>
                  <Flex direction="column" textAlign="end" width="45%">
                    <Text fontWeight="medium">Vendedor</Text>
                    <Text>Estado: {businessInfo.state}</Text>
                    <Text>
                      Cidade:{' '}
                      {businessInfo.city === businessInfo.country
                        ? businessInfo.state
                        : businessInfo.city}
                    </Text>
                    {businessInfo.street && (
                      <Text>Localização: {businessInfo.street}</Text>
                    )}
                  </Flex>
                </Flex>
              )}

              <OrderMapView
                user={{
                  location: {
                    lng: orderInfo.longitude,
                    lat: orderInfo.latitude,
                  },
                }}
                business={{
                  imageUrl: businessInfo.imageUrl,
                  location: {
                    lng: Number(businessInfo.longitude),
                    lat: Number(businessInfo.latitude),
                  },
                }}
              />
            </Flex>
          </Flex>
          <Flex
            width="100%"
            maxW={{ base: '90%', md: '700px', lg: '900px' }}
            direction="column"
            margin="30px auto 0px auto"
          >
            <Flex id="summary" direction="column" width="100%">
              <Text
                color="primary"
                fontSize={{
                  base: '20px',
                  sm: '26px',
                  md: '32px',
                  xl: '36px',
                }}
                fontWeight="medium"
              >
                Resumo
              </Text>
              {orderInfo.items.length > 0 ? (
                <Flex
                  id="summary-content"
                  direction="column"
                  borderRadius="5px"
                  border="2px solid #5647B2"
                  padding="20px"
                  fontSize={{
                    base: '14px',
                    sm: '18px',
                    md: '22px',
                    lg: '26px',
                    xl: '28px',
                  }}
                >
                  <Grid templateColumns="repeat(20, 1fr)" gap={4}>
                    <GridItem colSpan={4} color="primary" fontWeight="medium">
                      <Text display={{ base: 'none', md: 'initial' }}>
                        Quantidade
                      </Text>
                      <Text display={{ base: 'initial', md: 'none' }}>
                        Qtde
                      </Text>
                    </GridItem>
                    <GridItem colSpan={10} color="primary" fontWeight="medium">
                      <Text>Nome</Text>
                    </GridItem>
                    <GridItem colSpan={6} color="primary" fontWeight="medium">
                      <Text>Preço</Text>
                    </GridItem>
                    {orderInfo.items.map((item, key) => (
                      <React.Fragment key={key}>
                        <GridItem colSpan={4} color="accordion_list">
                          <Text>{item.quantity}</Text>
                        </GridItem>
                        <GridItem colSpan={10} color="accordion_list">
                          <Text
                            maxWidth="300px"
                            whiteSpace="nowrap"
                            overflow="hidden"
                            textOverflow="ellipsis"
                          >
                            {item.product.name}
                          </Text>
                        </GridItem>
                        <GridItem colSpan={6} color="accordion_list">
                          <Text>
                            {item.product.salePrice.toLocaleString(
                              'pt-BR',
                              format,
                            )}
                          </Text>
                        </GridItem>
                      </React.Fragment>
                    ))}
                  </Grid>
                </Flex>
              ) : (
                <Flex
                  direction="row"
                  align="center"
                  justify="center"
                  fontWeight="medium"
                  width="90%"
                  margin="30px auto"
                  textAlign="center"
                  color="primary"
                >
                  <Text fontSize={{ base: '18px', md: '30px', lg: '36px' }}>
                    Sem itens no pedido
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
          <Flex
            width="100%"
            maxW={{ base: '90%', md: '700px', lg: '900px' }}
            margin="0px auto"
            direction="column"
          >
            <Flex justify="space-between" width="100%" marginTop="30px">
              <Flex id="payment-method" direction="column">
                <Text
                  color="primary"
                  fontSize={{
                    base: '20px',
                    sm: '26px',
                    md: '32px',
                    xl: '36px',
                  }}
                  fontWeight="medium"
                >
                  Método de pagamento
                </Text>
                <Flex
                  align="center"
                  direction="column"
                  marginTop="2px"
                  fontSize={{
                    base: '16px',
                    sm: '20px',
                    md: '26px',
                    xl: '28px',
                  }}
                >
                  <Flex
                    gap={2}
                    width="100%"
                    align="center"
                    justify="start"
                    color="primary"
                    fontWeight="medium"
                  >
                    <Icon
                      as={
                        orderInfo.paymentMethod === 'CreditCard'
                          ? FiCreditCard
                          : FiDollarSign
                      }
                      fontSize={{
                        base: '24px',
                        sm: '28px',
                        md: '32px',
                        lg: '36px',
                        xl: '40px',
                      }}
                      strokeWidth="1.5"
                      transition="0.2s ease-in-out"
                    />
                    <Text>
                      {orderInfo.paymentMethod === 'CreditCard'
                        ? 'Cartão de crédito'
                        : 'Dinheiro'}
                    </Text>
                  </Flex>

                  {orderInfo.paymentMethod === 'Cash' && orderInfo.change && (
                    <Flex width="100%" marginTop="20px">
                      <Text color="primary">Troco:&nbsp;</Text>
                      <Text color="success_green">
                        {orderInfo.change.toLocaleString('pt-BR', format)}
                      </Text>
                    </Flex>
                  )}
                </Flex>
              </Flex>
              <Flex
                id="total"
                fontSize={{
                  base: '20px',
                  sm: '26px',
                  md: '32px',
                  xl: '36px',
                }}
                color="primary"
                fontWeight="medium"
                align="end"
                textAlign="end"
                direction="column"
              >
                <Text>Valor total</Text>
                <Text color="success_green">
                  {orderInfo.total.toLocaleString('pt-BR', format)}
                </Text>
              </Flex>
            </Flex>
            <Flex id="note" direction="column" margin="30px 0">
              <Text
                color="primary"
                fontSize={{
                  base: '20px',
                  sm: '26px',
                  md: '32px',
                  xl: '36px',
                }}
                fontWeight="medium"
              >
                Observações
              </Text>
              <Textarea
                placeholder="Nenhuma observação inserida"
                maxLength={300}
                resize="none"
                borderColor="primary"
                color="primary"
                border="2px"
                borderRadius="5px"
                _placeholder={{ color: 'primary_light' }}
                fontSize={{ base: '1rem', md: '1.3rem' }}
                height={{ base: '80px', md: '160px' }}
                _hover={{ borderColor: 'primary_hover' }}
                disabled={true}
                value={orderInfo.description}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <FooterMenu />
    </>
  );
};

const getOrderInfo = async (orderId: string, token: string) => {
  try {
    const response = await api.get(`order/${orderId}`, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getBusinessInfo = async (businessId: string, token: string) => {
  try {
    const response = await api.get(`business/${businessId}`, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getUserInfo = async (userId: string, token: string) => {
  try {
    const response = await api.get(`account/${userId}`, {
      headers: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

const getAddressInfo = async ({ lat, lng }: LocationProps) => {
  try {
    const response = await positionstackApi.get(
      `reverse?access_key=${process.env.POSITION_STACK_KEY}&query=${lat},${lng}`,
      {
        headers: {
          'content-type': 'multipart/form-data',
        },
      },
    );
    const { country, region, county, street, name } = response.data.data[0];
    return { country, region, county, street, name };
  } catch (error) {
    console.log(error);
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
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
  const { id: orderId } = params as ParamsProps;
  const orderInfo: OrderInfo = await getOrderInfo(orderId, session);
  const businessInfo: BusinessInfo = await getBusinessInfo(
    orderInfo.businessId,
    session,
  );
  const buyerInfo: UserInfo = await getUserInfo(orderInfo.buyerId, session);
  const sellerInfo: UserInfo = await getUserInfo(orderInfo.sellerId, session);
  const addressInfo = await getAddressInfo({
    lat: orderInfo.latitude.toString(),
    lng: orderInfo.longitude.toString(),
  });
  const usersInfo: FormatedUserInfo = {
    buyer: {
      email: buyerInfo.email,
      location: {
        country: addressInfo?.country,
        region: addressInfo?.region,
        county: addressInfo?.country,
        street: addressInfo?.street,
        name: addressInfo?.name,
      },
    },
    seller: {
      email: sellerInfo.email,
    },
  };
  const { id } = jwt_decode(session) as {
    id: string;
  };

  return {
    props: { orderId, token: session, id, orderInfo, businessInfo, usersInfo },
  };
};

export default OrderInfo;
