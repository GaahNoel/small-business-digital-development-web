import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { EstablishmentForm } from '../../components/establishment-register/establishment-form';
import { HeaderTitle } from '../../components/shared/header-title';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';

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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default EstablishmentRegister;
