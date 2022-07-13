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
import { BsShop, BsArrowUpRight } from 'react-icons/bs';
import { FiTool, FiShoppingBag, FiPackage } from 'react-icons/fi';
import { FiSearch } from 'react-icons/fi';
import { DefaultHeader } from '../components/shared/default-header';
import { useRouter } from 'next/router';
import { EntrepreneurButton } from '../components/home/entrepreneur-button';
import { Footer } from '../components/home/footer';
import Lottie from 'react-lottie';
import * as animationData from '../../public/business-idea-animation.json';
import { InputMap } from '../components/home/input-map';

const Home: NextPage = () => (
  <>
    <Flex width="100%" bg="primary" direction="column" minHeight="100vh">
      <Flex
        width={{ base: '90%', lg: '80%' }}
        maxW={{ base: '100%', md: '1280' }}
        alignSelf="center"
        direction="column"
        margin="0px auto"
      >
        <DefaultHeader />
        <Flex align="center" direction="column">
          <Flex
            display={{ base: 'none', md: 'flex' }}
            color="default_white"
            fontSize={{ md: '20px', lg: '24px' }}
            direction="column"
            align="center"
          >
            <Flex>
              <Text>Digite aqui seu&nbsp;</Text>
              <Text fontWeight="bold">endereço&nbsp;</Text>
              <Text>para&nbsp;</Text>
              <Text fontWeight="bold">buscar&nbsp;</Text>
              <Text>o que tem por&nbsp;</Text>
              <Text fontWeight="bold">perto</Text>
            </Flex>
          </Flex>
          <InputMap />
        </Flex>
      </Flex>
      <Flex
        bg="secondary"
        flex="1"
        direction="column"
        borderTopLeftRadius="105px"
        borderTopRightRadius={{ base: '0px', md: '105px' }}
        height="100%"
        width="100%"
      >
        <Flex
          direction="column"
          margin="0px auto 40px auto"
          width={{ base: '90%', lg: '80%' }}
          maxW={{ base: '100%', md: '1280' }}
          paddingBottom="100px"
          borderBottom="2px"
          borderColor="primary"
        >
          <Flex direction="row" justify="space-between">
            <PrincipalButton
              colorButton="default_orange"
              colorText="default_white"
              icon={FiPackage}
              text="Produtos"
              page="/product-list"
            />
            <PrincipalButton
              colorButton="service_blue"
              colorText="default_white"
              icon={FiTool}
              text="Serviços"
              page="/service-list"
            />
            <PrincipalButton
              colorButton="default_yellow"
              colorText="default_white"
              icon={FiShoppingBag}
              text="Loja"
              page="/shop"
            />
          </Flex>
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="space-between"
            width="100%"
            flex="1"
            marginTop={{ base: '0px', md: '60px' }}
            paddingBottom={{ base: '0px', md: '35px' }}
          >
            <Flex
              direction="column"
              align={{ base: 'center', md: 'start' }}
              justify="center"
              marginBottom={{ base: '40px', md: '0px' }}
              width="100%"
              flex="1"
            >
              <Flex
                direction="column"
                alignItems={{ base: 'center', md: 'normal' }}
              >
                <Flex
                  color="primary"
                  direction="column"
                  fontSize={[
                    '1.25rem',
                    '1.7rem',
                    '1.6rem',
                    '2rem',
                    '2.3rem',
                    '2.4rem',
                  ]}
                >
                  <Heading
                    as="h3"
                    fontWeight="semibold"
                    textAlign={{ base: 'center', md: 'initial' }}
                  >
                    Tudo o que precisa&nbsp;
                    <strong>em um só lugar</strong>
                  </Heading>
                </Flex>
                <Text
                  color="default_black"
                  fontSize={[
                    '1rem',
                    '1.4rem',
                    '1.15rem',
                    '1.35rem',
                    '1.5rem',
                    '1.7rem',
                  ]}
                >
                  Busque produtos e serviços que deseja
                </Text>
              </Flex>
              <EntrepreneurButton />
            </Flex>
            <Flex
              display={{ base: 'none', md: 'flex' }}
              align="center"
              justify="flex-end"
              minW="50%"
            >
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: animationData,
                  rendererSettings: {
                    preserveAspectRatio: 'xMidYMid slice',
                  },
                }}
                height={450}
                width={450}
                isStopped={false}
                isPaused={false}
              />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <Footer />
      <FooterMenu />
    </Flex>
  </>
);

export default Home;
