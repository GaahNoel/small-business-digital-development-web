import {
  Button,
  ButtonGroup,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { useState } from 'react';
import { FaShoppingBag } from 'react-icons/fa';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { UserLoginForm } from '../../components/user-register/user-login-form';
import { UserRegisterForm } from '../../components/user-register/user-register-form';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

const UserRegister = () => {
  const [formOption, setFormOption] = useState('Entrar');

  const changeOption = (option: string) => {
    if (formOption != option) {
      setFormOption(option);
    }
  };

  return (
    <>
      <Flex bg="secondary" direction="column" height="100vh">
        <HeaderHalfCircleTop>
          <Flex width="100%" maxWidth="300px" direction="column">
            <Stack direction="row" align="center" spacing={5}>
              <Heading as="h2" fontSize="24px" color="default_white">
                Cadastre-se já!
              </Heading>
              <Icon as={FaShoppingBag} fontSize="25px" color="secondary"></Icon>
            </Stack>
            <Text align="end" color="default_white">
              Aproveite nossa plataforma
            </Text>
          </Flex>
        </HeaderHalfCircleTop>
        <Flex justify="center" marginTop="10px">
          <ButtonGroup
            spacing={2}
            padding="2px"
            bg="secondary"
            borderRadius="14px"
          >
            <Button
              bg={formOption === 'Entrar' ? 'default_orange' : 'secondary'}
              color={formOption === 'Entrar' ? 'default_white' : 'primary'}
              borderRadius="14px"
              width="100px"
              onClick={() => {
                changeOption('Entrar');
              }}
            >
              Entrar
            </Button>
            <Button
              bg={formOption === 'Registrar' ? 'default_orange' : 'secondary'}
              color={formOption === 'Registrar' ? 'default_white' : 'primary'}
              borderRadius="14px"
              width="100px"
              onClick={() => {
                changeOption('Registrar');
              }}
            >
              Registrar
            </Button>
          </ButtonGroup>
        </Flex>
        {formOption === 'Entrar' ? <UserLoginForm /> : <UserRegisterForm />}
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
