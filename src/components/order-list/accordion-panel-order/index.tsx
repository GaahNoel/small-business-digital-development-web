import {
  AccordionPanel,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  List,
  ListIcon,
  ListItem,
  Select,
  Spinner,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { MutableRefObject, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiGift, FiSearch } from 'react-icons/fi';
import { BiMoney } from 'react-icons/bi';
import { InputType } from 'zlib';
import FormErrorMessage from '../../shared/form-error-message';
import { ListProductServiceCard } from '../../shared/list-product-service-card';
import { NoItemsText } from '../../shared/no-items-text';
import { Router, useRouter } from 'next/router';
import { routerNavigateUrl } from '../../../utils/router-navigate';

type AccordionPanelOrderProps = {
  orderId: string;
  status: 'CANCELED' | 'PENDING' | 'COMPLETED';
  total: number;
  items: Items;
  orderType: string;
  bgColor: string;
  navigateLoading: boolean;
  setNavigateLoading: (navigateLoading: boolean) => void;
};

type Items = {
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
}[];

type UserInfoCompleted = {
  name: string;
  email: string;
  verified: boolean;
  provider: string;
};

type UserInfoNedeed = {
  name: string;
  email: string;
};

export const AccordionPanelOrder = ({
  orderId,
  status,
  total,
  items,
  orderType,
  bgColor,
  navigateLoading,
  setNavigateLoading,
}: AccordionPanelOrderProps) => {
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
  };
  const [navigateLoadingLocal, setNavigateLoadingLocal] = useState(false);

  const navigateToOrder = async (orderId: string) => {
    if (!navigateLoading) {
      setNavigateLoadingLocal(true);
      setNavigateLoading(true);
      routerNavigateUrl(router, `/order-info/${orderId}`);
      setNavigateLoadingLocal(false);
      setNavigateLoading(false);
    }
  };

  return (
    <>
      <AccordionPanel bg={bgColor} padding="0px" paddingTop="15px">
        <Flex align="center" justify="center" borderTop="1px solid #5647B2">
          {!navigateLoadingLocal ? (
            <Flex
              width="100%"
              minHeight={{
                base: '120px',
                sm: '140px',
                md: '160px',
                lg: '180px',
                xl: '200px',
              }}
              overflow="hidden"
              transition="0.2s transform ease-in-out"
              cursor={!navigateLoading ? 'pointer' : 'default'}
              _hover={!navigateLoading ? { transform: 'scale(1.02)' } : {}}
              onClick={() => navigateToOrder(orderId)}
            >
              <Flex
                id="info"
                direction="column"
                textAlign="center"
                position="relative"
                minHeight="100%"
                width="100%"
                padding="10px 20px"
              >
                <Grid
                  height="100%"
                  width="100%"
                  templateColumns="repeat(10, 1fr)"
                >
                  <GridItem colSpan={8}>
                    <Flex direction="column" maxW="80%">
                      <Flex wordBreak="break-all">
                        <Text
                          fontSize={{
                            base: '12px',
                            sm: '14px',
                            md: '16px',
                            lg: '18px',
                            xl: '22px',
                          }}
                          fontWeight="bold"
                          textAlign="start"
                          color="primary"
                        >
                          {orderId}
                        </Text>
                      </Flex>
                      <Flex direction="column">
                        <List>
                          {items.map((item, key) => (
                            <ListItem key={key} width="100%">
                              <Flex
                                align="center"
                                textAlign="start"
                                width="100%"
                                color="accordion_list"
                                fontSize={{
                                  base: '12px',
                                  md: '14px',
                                  lg: '16px',
                                  xl: '20px',
                                }}
                              >
                                <ListIcon
                                  as={() => QuantityIcon(item.quantity)}
                                />
                                <Text
                                  width="70%"
                                  whiteSpace="nowrap"
                                  overflow="hidden"
                                  textOverflow="ellipsis"
                                  marginRight="10px"
                                >
                                  {item.product.name}
                                </Text>
                                <Text w={{ base: '100px', md: '200px' }}>
                                  {item.product.salePrice.toLocaleString(
                                    'pt-BR',
                                    format,
                                  )}
                                </Text>
                              </Flex>
                            </ListItem>
                          ))}
                        </List>
                      </Flex>
                    </Flex>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Flex
                      direction="column"
                      minHeight="100%"
                      align="end"
                      justify="space-between"
                      fontSize={{
                        base: '14px',
                        sm: '16px',
                        md: '18px',
                        xl: '20px',
                      }}
                      fontWeight="medium"
                    >
                      <Flex textAlign="center">
                        <Text
                          color={statusFormat[status].color}
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          textTransform="uppercase"
                        >
                          {statusFormat[status].text}
                        </Text>
                      </Flex>
                      <Flex textAlign="center">
                        <Text
                          whiteSpace="nowrap"
                          overflow="hidden"
                          textOverflow="ellipsis"
                          color="primary"
                        >
                          {total.toLocaleString('pt-BR', format)}
                        </Text>
                      </Flex>
                    </Flex>
                  </GridItem>
                </Grid>
              </Flex>
            </Flex>
          ) : (
            <Flex
              width="100%"
              minHeight={{
                base: '120px',
                sm: '140px',
                md: '160px',
                lg: '180px',
                xl: '200px',
              }}
              overflow="hidden"
              transition="0.2s transform ease-in-out"
              align="center"
              justify="center"
            >
              <Spinner
                thickness="4px"
                speed="0.65s"
                emptyColor="gray.200"
                color="default_white"
                size="xl"
              />
            </Flex>
          )}
        </Flex>
      </AccordionPanel>
    </>
  );
};

const QuantityIcon = (quantity: number) => {
  return (
    <Flex height="15px" alignItems="center" marginRight="10px">
      <Text width="15px">{quantity}</Text>
    </Flex>
  );
};
