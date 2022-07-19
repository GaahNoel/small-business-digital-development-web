import { Flex, IconButton, Img, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FiTool, FiChevronRight } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ModifyButton } from '../modify-button';

type ListProductServiceCardProps = {
  name: string;
  img: string;
  description: string;
  listPrice: number;
  salePrice: number;
  businessId: string;
  businessName: string;
  detailClick: () => void;
};

export const ListProductServiceCard = ({
  name,
  img,
  description,
  listPrice,
  salePrice,
  businessId,
  businessName,
  detailClick,
}: ListProductServiceCardProps) => {
  const format = {
    minimumFractionDigits: 2,
    style: 'currency',
    currency: 'BRL',
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
          lg: '360px',
          xl: '430px',
          '2xl': '530px',
        }}
        height={{
          base: '120px',
          sm: '140px',
          md: '160px',
          lg: '180px',
          xl: '200px',
        }}
        cursor="pointer"
        overflow="hidden"
        transition="0.2s transform ease-in-out"
        _hover={{ transform: 'scale(1.02)' }}
        spacing={1}
        onClick={detailClick}
      >
        <Flex
          height="100%"
          marginLeft={{ base: '25px', md: '0px' }}
          width={{
            base: '80px',
            sm: '100px',
            md: '140px',
            lg: '160px',
            xl: '180px',
          }}
          align="center"
          justify={{ base: 'center', md: 'start' }}
        >
          <Img
            objectFit="cover"
            src={img}
            width="100%"
            height={{ base: '80px', sm: '100px', md: '100%' }}
            borderBottomRightRadius={{ base: 'full', md: '100px' }}
            borderTopRightRadius={{ base: 'full', md: '0px' }}
            borderLeftRadius={{ base: 'full', md: '0px' }}
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
              fontSize={{ base: '14px', md: '16px', lg: '18px', xl: '22px' }}
              fontWeight="bold"
            >
              {name}
            </Text>
          </Flex>
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
              {description}
            </Text>
          </Flex>
          <Flex height="100%" width="100%" align="end">
            <Flex
              maxWidth="120px"
              width="100%"
              textAlign="start"
              justify="start"
              fontSize={{ base: '10px', lg: '12px', xl: '14px' }}
              fontWeight="medium"
            >
              <Text maxWidth="200px" fontStyle="italic">
                {businessName}
              </Text>
            </Flex>
            <Flex
              width="100%"
              textAlign="center"
              align="end"
              justify="end"
              fontSize={{ base: '12px', sm: '14px', md: '16px', x: '20px' }}
              fontWeight="medium"
            >
              {listPrice === salePrice ? (
                <Text
                  maxWidth="200px"
                  whiteSpace="nowrap"
                  overflow="hidden"
                  textOverflow="ellipsis"
                  color="success_green"
                >
                  {salePrice.toLocaleString('pt-BR', format)}
                </Text>
              ) : (
                <Stack spacing={1}>
                  <Text
                    maxWidth="200px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    color="error_red"
                    textDecoration="line-through"
                  >
                    {listPrice.toLocaleString('pt-BR', format)}
                  </Text>
                  <Text
                    maxWidth="200px"
                    whiteSpace="nowrap"
                    overflow="hidden"
                    textOverflow="ellipsis"
                    color="success_green"
                  >
                    {salePrice.toLocaleString('pt-BR', format)}
                  </Text>
                </Stack>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Stack>
    </>
  );
};
