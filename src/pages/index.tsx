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
      <Flex width={{base: "90%", lg:"80%"}} maxW={{base: "100%", md: "1280"}} alignSelf="center" direction="column" margin="0px auto">
        <DefaultHeader />
        <Flex align="center" direction="column">
          <Text display={{base: "none", md:"flex"}} color="default_white" fontSize={{md: "20px", lg: "24px"}}>Digite aqui seu endereço para buscar o que tem por perto</Text>
          <Stack
            bg="default_white"
            margin="30px auto 90px auto"
            minW="200px"
            width="72%"
            padding="5px 10px"
            borderRadius="20px"
            align="center"
            direction="row"
            spacing={2}
          >
            <IconButton
              as={FiSearch}
              aria-label="16px"
              color="primary"
              size="sm"
              bg="default_white"
              cursor="pointer"
            />
            <Input
              id={'search'}
              type={'text'}
              placeholder={'Digite aqui seu endereço'}
              whiteSpace="nowrap"
              overflow="hidden"
              textOverflow="ellipsis"
              border="none"
            />
          </Stack>
        </Flex>    
      </Flex>
      <Flex
          bg="secondary"
          borderTopLeftRadius="105px"
          height="100%"
          width="100%"
        >
          <Flex direction="column" margin="0px auto" width={{base: "90%", lg:"80%"}} maxW={{base: "100%", md: "1280"}}>
            <Flex direction="row" justify="space-between">
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
            </Flex>
            <Flex direction={{base: "column", md: "row"}} justify="space-between" width="100%" flex="1" marginTop={{base: "0px", md: "35px"}}>
              <Flex direction="column" align={{base: "center", md: "start"}} justify="center" marginBottom="40px" width="100%" flex="1">
                <Flex direction="column" alignItems={{base: "center", md: "normal"}}>
                  <Heading as="h3" color="primary" fontSize={["1.25rem","1.7rem","1.45rem","1.6rem", "1.8rem", "2.2rem"]}>
                    Tudo o que precisa em um só lugar
                  </Heading>
                  <Text color="default_black" fontSize={["1rem","1.4rem","1.15rem","1.35rem", "1.5rem", "1.7rem"]}>
                    Busque produtos e serviços que deseja
                  </Text>
                </Flex>
                <EntrepreneurButton />
              </Flex>
              <Flex display={{base: 'none', md: 'flex'}} align="center" justify="flex-end" minW="50%">
                <Img src="Shop.svg" w={{base:'350px', lg:"450px"}} />
              </Flex>
            </Flex>
          </Flex>
          <FooterMenu />
      </Flex>
    </Flex>
  </>
);

export default Home;
