import {
  Button,
  Flex,
  Heading,
  Icon,
  IconButton,
  Img,
  Input,
  Stack,
  Text,
} from '@chakra-ui/react';
import type { NextPage } from 'next';
import { PrincipalButton } from '../components/home/principal-button';
import { FooterMenu } from '../components/shared/footer-menu';
import { BsBoxSeam, BsShop, BsArrowUpRight } from 'react-icons/bs';
import { FiTool } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper';
import { DefaultHeader } from '../components/shared/default-header';

const Home: NextPage = () => (
  <>
    <Flex width="100%" bg="primary" direction="column" height="100vh">
      <DefaultHeader />
      <Stack
        bg="default_white"
        margin="30px auto 90px auto"
        maxW="400px"
        padding="5px 10px"
        borderRadius="20px"
        align="center"
        direction="row"
        spacing={2}
      >
        <IconButton
          as={FiSearch}
          color="primary"
          size="sm"
          bg="default_white"
          cursor="pointer"
        />
        <Input
          id={'search'}
          type={'text'}
          placeholder={
            'Digite aqui seu endereço para buscar o que tem por perto'
          }
          border="none"
        />
      </Stack>
      <Flex bg="secondary" direction="column" borderTopLeftRadius="105px">
        <Stack direction="row" justify="center" spacing={5}>
          <PrincipalButton
            colorButton="default_orange"
            colorText="default_white"
            icon={BsBoxSeam}
            text="Produtos"
          />
          <PrincipalButton
            colorButton="service_blue"
            colorText="default_white"
            icon={FiTool}
            text="Serviços"
          />
          <PrincipalButton
            colorButton="shop_yellow"
            colorText="default_white"
            icon={BsShop}
            text="Loja"
          />
        </Stack>
        <Flex direction="column" align="center" margin="7px 0px">
          <Heading as="h3" color="primary" fontSize="1.3rem">
            Tudo o que precisa em um só lugar
          </Heading>
          <Text color="default_black" fontSize="1rem">
            Busque produtos e serviços que deseja
          </Text>
        </Flex>
        <Button
          bg="primary"
          _hover={{ bg: 'primary_hover' }}
          padding="50px"
          maxW="300px"
          margin="45px auto"
          boxShadow="dark-lg"
        >
          <Stack
            direction="row"
            align="center"
            spacing={4}
            color="default_white"
          >
            <Flex bg="default_white" padding="14px" borderRadius="full">
              <Icon as={BsArrowUpRight} color="primary" fontSize="25px" />
            </Flex>
            <Flex direction="column" align="flex-start">
              <Text fontSize="1.2rem">Área do empreendedor</Text>
              <Text fontSize="1rem" fontWeight="normal">
                Anuncie já seus produtos
              </Text>
            </Flex>
          </Stack>
        </Button>
        <FooterMenu />
      </Flex>
    </Flex>
  </>
);

export default Home;
