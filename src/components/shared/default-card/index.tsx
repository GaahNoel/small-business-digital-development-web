import { Flex, IconButton, Img, Stack, Text } from '@chakra-ui/react';
import React from 'react';
import { FiTool, FiChevronRight } from 'react-icons/fi';
import { RiDeleteBinLine } from 'react-icons/ri';
import { ModifyButton } from '../modify-button';

type DefaultCardProps = {
  name: string;
  img: string;
  detailClick: () => void;
  editItem: (e: React.MouseEvent<HTMLDivElement>) => void;
  removeItem: (e: React.MouseEvent<HTMLDivElement>) => void;
};

export const DefaultCard = ({
  img,
  name,
  detailClick,
  editItem,
  removeItem,
}: DefaultCardProps) => {
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
          sm: '355px',
          md: '405px',
          lg: '430px',
          xl: '530px',
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
        transition="0.2s border ease-in-out"
        _hover={{ transform: 'scale(1.02)' }}
        onClick={detailClick}
        spacing={1}
      >
        <Flex
          width="100%"
          height="100%"
          align="center"
          justify={{ base: 'center', md: 'start' }}
        >
          <Img
            src={img}
            width={{
              base: '80px',
              sm: '100px',
              md: '160px',
              lg: '180px',
              xl: '200px',
            }}
            height={{ base: '80px', sm: '100px', md: '100%' }}
            borderBottomRightRadius={{ base: 'full', md: '100px' }}
            borderTopRightRadius={{ base: 'full', md: '0px' }}
            borderLeftRadius={{ base: 'full', md: '0px' }}
            objectFit="cover"
          />
        </Flex>
        <Flex
          direction="column"
          justify="space-around"
          textAlign="center"
          width="100%"
          height="100%"
        >
          <Flex
            maxWidth="300px"
            wordBreak="break-all"
            textAlign="center"
            justify="center"
          >
            <Text
              fontSize={{
                base: '14px',
                sm: '18px',
                md: '22px',
                lg: '24px',
                xl: '26px',
              }}
              fontWeight="bold"
            >
              {name}
            </Text>
          </Flex>
          <Stack direction="row" justify="center" spacing={2}>
            <ModifyButton
              icon={FiTool}
              text="Editar"
              color="primary"
              onClick={editItem}
            />
            <ModifyButton
              icon={RiDeleteBinLine}
              text="Remover"
              color="default_orange"
              onClick={removeItem}
            />
          </Stack>
        </Flex>
        <Flex width="auto" justify="end">
          <IconButton
            as={FiChevronRight}
            bg="card_white"
            aria-label="16px"
            _hover={{ bg: 'card_white_hover' }}
            cursor="pointer"
            onClick={() => {
              detailClick();
            }}
          />
        </Flex>
      </Stack>
    </>
  );
};
