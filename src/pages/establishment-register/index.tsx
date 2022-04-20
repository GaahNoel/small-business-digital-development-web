import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { EstablishmentForm } from '../../components/establishment-register/establishment-form';
import { HeaderTitle } from '../../components/shared/header-title';

const EstablishmentRegister = () => {
  return (
    <>
      <Flex bg="primary" align="center" direction="column">
        <HeaderTitle
          text="Cadastre já seu estabelecimento!"
          icon={FaShoppingBag}
        />
        <EstablishmentForm />
      </Flex>
    </>
  );
};

export default EstablishmentRegister;
