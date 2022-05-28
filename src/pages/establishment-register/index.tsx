import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { EstablishmentForm } from '../../components/establishment-register/establishment-form';
import { HeaderTitle } from '../../components/shared/header-title';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';

type EstablishmentRegisterProps = {
  session: string;
};

const EstablishmentRegister = ({ session }: EstablishmentRegisterProps) => {
  useEffect(() => {
    console.log(session);
  }, []);
  return (
    <>
      <Flex
        bg="primary"
        align="center"
        direction="column"
        minHeight="100vh"
        flex="1"
      >
        <HeaderTitle
          text="Cadastre já seu estabelecimento!"
          icon={FaShoppingBag}
        />
        <EstablishmentForm session={session} />
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};

export default EstablishmentRegister;
