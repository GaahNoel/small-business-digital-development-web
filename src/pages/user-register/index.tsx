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

const UserRegister = () => {
  const [formOption, setFormOption] = useState('Registrar');

  const changeOption = (option: string) => {
    console.log(option);
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
            spacing={0}
            padding="2px"
            bg="secondary"
            borderRadius="14px"
          >
            {formOption === 'Registrar' ? (
              <>
                <Button
                  bg="default_orange"
                  color="default_white"
                  borderRadius="14px"
                  onClick={() => {
                    changeOption('Registrar');
                  }}
                >
                  Registrar
                </Button>
                <Button
                  bg="secondary"
                  color="primary"
                  borderRadius="14px"
                  onClick={() => {
                    changeOption('Entrar');
                  }}
                >
                  Entrar
                </Button>
              </>
            ) : (
              <>
                <Button
                  bg="secondary"
                  color="primary"
                  borderRadius="14px"
                  onClick={() => {
                    changeOption('Registrar');
                  }}
                >
                  Registrar
                </Button>
                <Button
                  bg="default_orange"
                  color="default_white"
                  borderRadius="14px"
                  onClick={() => {
                    changeOption('Entrar');
                  }}
                >
                  Entrar
                </Button>
              </>
            )}
          </ButtonGroup>
        </Flex>
        {formOption === 'Registrar' ? <UserRegisterForm /> : <UserLoginForm />}
      </Flex>
    </>
  );
};

export default UserRegister;
