import {
  Button,
  Flex,
  Icon,
  IconButton,
  Img,
  Stack,
  Text,
} from '@chakra-ui/react';
import React from 'react';
import { FiTool, FiChevronRight, FiMinus, FiPlus } from 'react-icons/fi';
import useCart from '../../../../../hooks/cart';

type SideCartCardProps = {
  id: string;
  name: string;
  img: string;
  price: number;
  businessName: string;
  quantity: number;
};

export const SideCartCard = ({
  id,
  name,
  img,
  price,
  businessName,
  quantity,
}: SideCartCardProps) => {
  const cart = useCart();
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
  };

  const incrementQuantity = () => {
    cart.incrementItem(id);
  };

  const decrementQuantity = () => {
    cart.decrementItem(id);
  };

  return (
    <>
      <Stack
        direction="row"
        align="center"
        justify={{ base: 'center', md: 'start' }}
        bg="card_white"
        borderRadius="2xl"
        boxShadow="dark-lg"
        width={{
          base: '330px',
          sm: '380px',
          md: '420px',
        }}
        minHeight={{
          base: '120px',
          sm: '140px',
          md: '160px',
        }}
        overflow="hidden"
        transition="0.2s border ease-in-out"
        spacing={1}
      >
        <Flex height="100%" width="160px" align="center" justify="start">
          <Img
            objectFit="cover"
            src={img}
            width="100%"
            height="100%"
            borderBottomRightRadius="100px"
          />
        </Flex>
        <Flex
          direction="column"
          textAlign="center"
          height="100%"
          flex="1"
          padding={{ base: '10px', md: '20px' }}
        >
          <Flex wordBreak="break-all">
            <Text
              maxWidth="300px"
              fontSize={{ base: '14px', md: '16px' }}
              fontWeight="bold"
            >
              {name}
            </Text>
          </Flex>
          <Flex height="100%" width="100%" marginTop="5px">
            <Flex
              maxWidth="120px"
              width="100%"
              textAlign="start"
              justify="start"
              fontSize={{ base: '10px', lg: '12px' }}
              fontWeight="medium"
            >
              <Text maxWidth="200px" fontStyle="italic">
                {businessName}
              </Text>
            </Flex>
            <Flex
              width="100%"
              textAlign="center"
              justify="end"
              fontSize={{ base: '12px', sm: '14px', md: '16px' }}
              fontWeight="medium"
            >
              <Text
                maxWidth="200px"
                whiteSpace="nowrap"
                overflow="hidden"
                textOverflow="ellipsis"
                color="success_green"
              >
                {price.toLocaleString('pt-BR', format)}
              </Text>
            </Flex>
          </Flex>
          <Flex align="center" justify="center" marginTop="10px">
            <IconButton
              aria-label="Decrement quantity"
              color="default_white"
              bg="primary"
              borderRadius="full"
              size="xs"
              _hover={{ bg: 'primary_hover' }}
              onClick={decrementQuantity}
            >
              <Icon as={FiMinus} fontSize="20px"></Icon>
            </IconButton>
            <Text
              margin="0px 10px"
              color="primary"
              fontSize="24px"
              fontWeight="bold"
            >
              {quantity}
            </Text>
            <IconButton
              aria-label="Increment quantity"
              color="default_white"
              bg="primary"
              borderRadius="full"
              size="xs"
              _hover={{ bg: 'primary_hover' }}
              onClick={incrementQuantity}
            >
              <Icon as={FiPlus} fontSize="20px"></Icon>
            </IconButton>
          </Flex>
        </Flex>
      </Stack>
    </>
  );
};
