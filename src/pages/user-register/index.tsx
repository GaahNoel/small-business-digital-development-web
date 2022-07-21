import {
  Box,
  Button,
  ButtonGroup,
  Fade,
  Flex,
  Heading,
  Icon,
  ScaleFade,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { UserLoginForm } from '../../components/user-register/user-login-form';
import { UserRegisterForm } from '../../components/user-register/user-register-form';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { RightImage } from '../../components/user-register/right-image';

const UserRegister = () => {
  const [formOption, setFormOption] = useState('Entrar');
  const [loginMounted, setLoginMounted] = useState(true);
  const [registerMounted, setRegisterMounted] = useState(false);

  const changeOption = (option: string) => {
    if (formOption != option) {
      setFormOption(option);
    }
  };

  return (
    <>
      <Flex bg="secondary" direction="column" minHeight="100vh">
        <Box width="100%" display={{ base: 'block', lg: 'none' }}>
          <HeaderHalfCircleTop>
            <Flex
              width="100%"
              maxWidth={{ base: '300px', sm: '350px' }}
              direction="column"
            >
              <Stack direction="row" align="center" spacing={3}>
                <Heading
                  as="h2"
                  fontSize={{ base: '24px', sm: '30px', md: '36px' }}
                  color="default_white"
                >
                  Acesse já!
                </Heading>
                <Icon
                  as={FaShoppingBag}
                  fontSize={{ base: '25px', sm: '32px', md: '38px' }}
                  color="secondary"
                ></Icon>
              </Stack>
              <Text
                align="end"
                fontSize={{ base: '16px', sm: '20px', md: '23px' }}
                color="default_white"
              >
                Aproveite nossa plataforma
              </Text>
            </Flex>
          </HeaderHalfCircleTop>
        </Box>
        <Flex>
          <Flex
            border="2px #000"
            borderRadius="3xl"
            bg="default_white"
            boxShadow="14px 15px 15px -8px rgba(0,0,0,0.35);"
            padding={{ base: '15px', md: '50px' }}
            direction="column"
            align="center"
            justify="center"
            margin={{ base: '15px auto', lg: 'auto' }}
            maxWidth="400px"
            position="relative"
            right={{ base: '0', xl: '-20%' }}
          >
            <Flex justify="center" marginTop="10px">
              <ButtonGroup
                spacing={2}
                padding="2px"
                bg="default_white"
                borderRadius="14px"
              >
                <Button
                  bg={
                    formOption === 'Entrar' ? 'default_orange' : 'default_white'
                  }
                  color={formOption === 'Entrar' ? 'default_white' : 'primary'}
                  borderRadius="14px"
                  height={{ base: '40px', md: '50px' }}
                  width={{ base: '100px', md: '130px' }}
                  fontSize={{ base: '16px', md: '20px' }}
                  onClick={() => {
                    changeOption('Entrar');
                  }}
                >
                  Entrar
                </Button>
                <Button
                  bg={
                    formOption === 'Registrar'
                      ? 'default_orange'
                      : 'default_white'
                  }
                  color={
                    formOption === 'Registrar' ? 'default_white' : 'primary'
                  }
                  borderRadius="14px"
                  height={{ base: '40px', md: '50px' }}
                  width={{ base: '100px', md: '130px' }}
                  fontSize={{ base: '16px', md: '20px' }}
                  onClick={() => {
                    changeOption('Registrar');
                  }}
                >
                  Registrar
                </Button>
              </ButtonGroup>
            </Flex>

            <ScaleFade
              in={!registerMounted && formOption === 'Entrar'}
              unmountOnExit={true}
              onUnmount={() => {
                setLoginMounted(false);
                setRegisterMounted(true);
              }}
            >
              <UserLoginForm />
            </ScaleFade>
            <ScaleFade
              in={!loginMounted && formOption === 'Registrar'}
              unmountOnExit={true}
              onUnmount={() => {
                setRegisterMounted(false);
                setLoginMounted(true);
              }}
            >
              <UserRegisterForm changeOption={changeOption} />
            </ScaleFade>
          </Flex>
          <Flex width="60%" display={{ base: 'none', lg: 'flex' }}>
            <RightImage />
          </Flex>
        </Flex>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default UserRegister;
