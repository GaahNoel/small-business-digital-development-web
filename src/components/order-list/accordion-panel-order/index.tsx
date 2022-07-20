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
  ListItem,
  Select,
  Stack,
  Text,
  UnorderedList,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiGift, FiSearch } from 'react-icons/fi';
import { BiMoney } from 'react-icons/bi';
import { InputType } from 'zlib';
import FormErrorMessage from '../../shared/form-error-message';
import { ListProductServiceCard } from '../../shared/list-product-service-card';
import { NoItemsText } from '../../shared/no-items-text';

type AccordionPanelOrderProps = {
  orderId: string;
  status: string;
  total: number;
  items: Items;
  orderType: string;
  bgColor: string;
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

export const AccordionPanelOrder = ({
  orderId,
  status,
  total,
  items,
  orderType,
  bgColor,
}: AccordionPanelOrderProps) => {
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };
  return (
    <>
      <AccordionPanel bg={bgColor} padding="0px" paddingTop="15px">
        <Flex align="center" justify="center">
          <Flex
            border="1px solid #000"
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
              <Flex height="100%">
                <Flex align="center" width="15%">
                  <Icon fontSize="24px" boxSize="100px">
                    {orderType === 'Compras' ? <FiGift /> : <BiMoney />}
                  </Icon>
                </Flex>
                <Flex direction="column" margin="0px 15px" flex="1">
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
                    >
                      {orderId}
                    </Text>
                  </Flex>
                  <Flex direction="column">
                    <UnorderedList>
                      {items.map((item, key) => (
                        <ListItem key={key}>
                          <Flex
                            align="center"
                            textAlign="start"
                            fontSize={{
                              base: '10px',
                              sm: '12px',
                              md: '14px',
                              lg: '16px',
                              xl: '20px',
                            }}
                          >
                            <Text w="60%">{item.product.name}</Text>
                            <Text w="25%">
                              {item.product.salePrice.toLocaleString(
                                'pt-BR',
                                format,
                              )}
                            </Text>
                            <Text w="5%">{item.quantity}</Text>
                          </Flex>
                        </ListItem>
                      ))}
                    </UnorderedList>
                  </Flex>
                </Flex>
                <Flex
                  direction="column"
                  minHeight="100%"
                  align="end"
                  justify="end"
                  width="15%"
                >
                  <Flex
                    textAlign="center"
                    fontSize={{ base: '10px', lg: '12px', xl: '14px' }}
                    fontWeight="medium"
                  >
                    <Text
                      maxWidth={{
                        base: '200px',
                        sm: '230px',
                        lg: '150px',
                        xl: '200px',
                      }}
                      whiteSpace="nowrap"
                      overflow="hidden"
                      textOverflow="ellipsis"
                    >
                      {status}
                    </Text>
                  </Flex>
                  <Flex>
                    <Flex
                      width="100%"
                      textAlign="center"
                      fontSize={{
                        base: '16px',
                        sm: '18px',
                        md: '20px',
                        xl: '22px',
                      }}
                      fontWeight="medium"
                    >
                      <Text
                        whiteSpace="nowrap"
                        overflow="hidden"
                        textOverflow="ellipsis"
                        color="success_green"
                      >
                        {total.toLocaleString('pt-BR', format)}
                      </Text>
                    </Flex>
                  </Flex>
                </Flex>
              </Flex>
            </Flex>
          </Flex>
        </Flex>
      </AccordionPanel>
    </>
  );
};
