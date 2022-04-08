import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { RegisterForm } from '../../components/user-register/register-form';

const UserRegister = () => {
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
        <RegisterForm />
      </Flex>
    </>
  );
};

export default UserRegister;
