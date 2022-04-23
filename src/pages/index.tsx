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
import { DefaultHeader } from '../components/shared/default-header';
import { useRouter } from 'next/router';
import { EntrepreneurButton } from '../components/home/entrepreneur-button';

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
      <Flex
        bg="secondary"
        direction="column"
        height="100%"
        borderTopLeftRadius="105px"
      >
        <Stack direction="row" justify="center" spacing={5}>
          <PrincipalButton
            colorButton="default_orange"
            colorText="default_white"
            icon={BsBoxSeam}
            text="Produtos"
            page="/"
          />
          <PrincipalButton
            colorButton="service_blue"
            colorText="default_white"
            icon={FiTool}
            text="Serviços"
            page="/"
          />
          <PrincipalButton
            colorButton="default_yellow"
            colorText="default_white"
            icon={BsShop}
            text="Loja"
            page="/shop"
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
        <EntrepreneurButton />
        <FooterMenu />
      </Flex>
    </Flex>
  </>
);

export default Home;
