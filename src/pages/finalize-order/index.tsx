import {
  Accordion,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
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
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { FiCreditCard, FiDollarSign } from 'react-icons/fi';
import { ButtonCheckbox } from '../../components/finalize-order/button-checkbox';
import { BsCashStack } from 'react-icons/bs';

type FinalizeOrderFormData = {
  paymentMethod: PaymentMethod;
  note: string;
};

type PaymentMethod = 'credit-card' | 'cash';

const FinalizeOrder = () => {
  const cart = useCart();
  const router = useRouter();
  const [viewMode, setViewMode] = useState('Compras');
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('credit-card');
  const methods = useForm<FinalizeOrderFormData>();
  const {
    handleSubmit,
    formState: { errors },
    register,
    setError,
  } = methods;
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };

  const onSubmit: SubmitHandler<FinalizeOrderFormData> = async ({
    paymentMethod,
    note,
  }) => {
    console.log(paymentMethod);
    console.log(note);
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
              color="default_white"
              fontWeight="medium"
              fontSize={{ base: '30px', sm: '36px', md: '38px', xl: '42px' }}
              justify="center"
              padding="40px 0px"
            >
              <Text>Revisão do pedido</Text>
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
          <FormProvider {...methods}>
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
              <Flex
                width="100%"
                maxW={{ base: '90%', md: '700px', lg: '900px' }}
                margin="30px auto"
                direction="column"
              >
                <Flex id="summary" direction="column" width="100%">
                  <Text
                    color="primary"
                    fontSize={{
                      base: '24px',
                      sm: '28px',
                      md: '32px',
                      xl: '36px',
                    }}
                    fontWeight="medium"
                  >
                    Resumo
                  </Text>
                  <Flex
                    id="summary-content"
                    direction="column"
                    border="1px solid #5647B2"
                    bg="default_white"
                    padding="20px"
                    fontSize={{
                      base: '14px',
                      sm: '18px',
                      md: '22px',
                      xl: '26px',
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
                      <GridItem
                        colSpan={10}
                        color="primary"
                        fontWeight="medium"
                      >
                        <Text>Nome</Text>
                      </GridItem>
                      <GridItem colSpan={6} color="primary" fontWeight="medium">
                        <Text>Preço</Text>
                      </GridItem>
                      {cart.items.map((item) => (
                        <>
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
                              {item.name}
                            </Text>
                          </GridItem>
                          <GridItem colSpan={6} color="accordion_list">
                            <Text>
                              {item.price.toLocaleString('pt-BR', format)}
                            </Text>
                          </GridItem>
                        </>
                      ))}
                    </Grid>
                  </Flex>
                </Flex>
                <Flex direction="column" width="100%" marginTop="40px">
                  <Text
                    color="primary"
                    fontSize={{
                      base: '24px',
                      sm: '28px',
                      md: '32px',
                      xl: '36px',
                    }}
                    fontWeight="medium"
                  >
                    Método de pagamento
                  </Text>
                  <Flex direction="column" align="center" gap={3}>
                    <ButtonCheckbox
                      description="Cartão de crédito"
                      icon={FiCreditCard}
                      paymentMethod="credit-card"
                      currentPaymentMethod={paymentMethod}
                      selectCurrentPaymentMethod={setPaymentMethod}
                    />
                    <Flex width="100%" direction="column">
                      <ButtonCheckbox
                        description="Dinheiro"
                        icon={FiDollarSign}
                        paymentMethod="cash"
                        currentPaymentMethod={paymentMethod}
                        selectCurrentPaymentMethod={setPaymentMethod}
                      />
                      <Flex
                        direction="column"
                        color="primary"
                        marginTop="15px"
                        display={paymentMethod === 'cash' ? 'flex' : 'none'}
                        transition="0.2s ease-in-out"
                      >
                        <Text>Insira o valor de troco, se necessário:</Text>
                        <InputGroup bg="default_white" width="150px">
                          <InputLeftElement
                            pointerEvents="none"
                            fontSize="1.2em"
                          >
                            $
                          </InputLeftElement>
                          <Input placeholder="Digite o valor de troco" />
                        </InputGroup>
                      </Flex>
                    </Flex>
                  </Flex>
                </Flex>
                <Flex id="buttons" width="100%" justify="space-between"></Flex>
              </Flex>
            </FormControl>
          </FormProvider>
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
