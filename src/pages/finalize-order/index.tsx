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
import { getToken } from 'next-auth/jwt';
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

type FinalizeOrderFormData = {
  change: number;
  noteArea: string;
};

type PaymentMethod = 'CreditCard' | 'Cash';

const FinalizeOrder = () => {
  const cart = useCart();
  const router = useRouter();
  const [finalizeOrderLoading, setFinalizeOrderLoading] = useState(false);
  const [useChange, setUseChange] = useState(false);
  const [paymentMethod, setPaymentMethod] =
    useState<PaymentMethod>('CreditCard');
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

  const onCheckboxChange = async () => {
    setUseChange(!useChange);
  };

  const onSubmit: SubmitHandler<FinalizeOrderFormData> = async ({
    change,
    noteArea,
  }) => {
    finalizeOrder(change, noteArea);
  };

  useEffect(() => {
    console.log(cart.itemsLength);
  }, [cart.itemsLength]);

  const finalizeOrder = (change: number, note: string) => {
    Swal.fire({
      title: 'Tem certeza que deseja finalizar o pedido?',
      showDenyButton: true,
      confirmButtonText: 'Sim',
      denyButtonText: `Não`,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmFinalizeOrder(change, note);
      }
    });
  };

  const confirmFinalizeOrder = async (change: number, note: string) => {
    setFinalizeOrderLoading(true);
    await cart.finalize(paymentMethod, change, note);
    setFinalizeOrderLoading(false);
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
              {cart.itemsLength > 0 ? (
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
                    {cart.items.map((item, key) => (
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
                            {item.name}
                          </Text>
                        </GridItem>
                        <GridItem colSpan={6} color="accordion_list">
                          <Text>
                            {item.price.toLocaleString('pt-BR', format)}
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
                    Sem itens no pedido para confirmar a compra
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>

          <FormProvider {...methods}>
            <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
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
                      direction={{ base: 'column', md: 'row' }}
                      align="center"
                      gap={3}
                      marginTop="2px"
                    >
                      <ButtonCheckbox
                        description="Cartão de crédito"
                        icon={FiCreditCard}
                        paymentMethod="CreditCard"
                        currentPaymentMethod={paymentMethod}
                        selectCurrentPaymentMethod={setPaymentMethod}
                      />
                      <ButtonCheckbox
                        description="Dinheiro"
                        icon={FiDollarSign}
                        paymentMethod="Cash"
                        currentPaymentMethod={paymentMethod}
                        selectCurrentPaymentMethod={setPaymentMethod}
                      />
                    </Flex>
                    <Collapse in={paymentMethod === 'Cash'}>
                      <Flex
                        direction={{ base: 'column', md: 'row' }}
                        color="primary"
                        marginTop="30px"
                        fontSize={{
                          base: '14px',
                          sm: '16px',
                          md: '18px',
                          xl: '22px',
                        }}
                        transition="0.2s ease-in-out"
                        gap={3}
                      >
                        <Checkbox
                          onChange={onCheckboxChange}
                          color="primary"
                          colorScheme="purple"
                          borderColor="primary"
                          size="lg"
                          width="200px"
                        >
                          Preciso de troco
                        </Checkbox>
                        <InputGroup width="200px">
                          <InputLeftElement
                            pointerEvents="none"
                            fontSize="1.2em"
                          >
                            $
                          </InputLeftElement>
                          <Input
                            {...register('change')}
                            as={CurrencyInput}
                            placeholder="Digite o valor"
                            _placeholder={{ color: 'primary_light' }}
                            disabled={!useChange}
                            border="2px"
                            borderRadius="5px"
                            borderColor="primary"
                            decimalsLimit={2}
                            maxLength={7}
                            _hover={{ borderColor: 'primary_hover' }}
                          />
                        </InputGroup>
                      </Flex>
                    </Collapse>
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
                      {cart.total.toLocaleString('pt-BR', format)}
                    </Text>
                  </Flex>
                </Flex>
                <Flex id="note" direction="column" marginTop="30px">
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
                    {...register('noteArea')}
                    placeholder="Digite quaisquer informações adicionais necessárias"
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
                  />
                </Flex>
                <Flex id="buttons" marginTop="30px" justify="flex-end">
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
                      onClick={router.back}
                    >
                      <Text>Cancelar</Text>
                    </Button>
                    <Button
                      type="submit"
                      bg="primary"
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
                      disabled={cart.itemsLength === 0}
                    >
                      {!finalizeOrderLoading ? (
                        <Text>Finalizar pedido</Text>
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
