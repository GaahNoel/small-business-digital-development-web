import {
  Button,
  Flex,
  FormControl,
  Heading,
  Icon,
  Stack,
  Text,
} from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import FormInput from '../../components/user-register/form-input';

const UserRegister = () => {
  return (
    <>
      <Flex bg="secondary" direction="column" height="100vh">
        <Flex
          direction="column"
          bg="primary"
          padding="80px 0px"
          borderBottomRadius="200px"
          align="center"
        >
          <Flex width="100%" maxWidth="300px" direction="column">
            <Stack direction="row" align="center" spacing={3}>
              <Heading as="h2" fontSize="24px" color="default_white">
                Cadastre-se já!
              </Heading>
              <Icon as={FaShoppingBag} fontSize="25px" color="secondary"></Icon>
            </Stack>
            <Text align="end" color="default_white">
              Aproveite nossa plataforma
            </Text>
          </Flex>
        </Flex>
        <FormControl width="100%" maxWidth="275px" margin="20px auto">
          <FormInput
            id="name"
            field="Nome"
            type="text"
            placeholder="Digite o nome desejado"
          />
          <FormInput
            id="email"
            field="Email"
            type="email"
            placeholder="Digite o email desejado"
          />
          <FormInput
            id="password"
            field="Senha"
            type="password"
            placeholder="Digite sua senha"
          />
          <FormInput
            id="confirm_password"
            field="Confirmar Senha"
            type="password"
            placeholder="Confirme sua senha"
          />
          <Stack direction="row" justify="center" spacing={25} marginTop="30px">
            <Button
              bg="default_black"
              color="default_white"
              variant="solid"
              width="125px"
            >
              Cancelar
            </Button>
            <Button
              bg="primary"
              color="default_white"
              variant="solid"
              width="125px"
            >
              Enviar
            </Button>
          </Stack>
        </FormControl>
      </Flex>
    </>
  );
};

export default UserRegister;
