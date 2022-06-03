import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { EstablishmentForm } from '../../components/establishment-register/establishment-form';
import { HeaderTitle } from '../../components/shared/header-title';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';

type EstablishmentRegisterProps = {
  session: string;
};

const EstablishmentRegister = ({ session }: EstablishmentRegisterProps) => {
  const router = useRouter();
  
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
        <Flex bg="secondary" padding="30px 0px" borderTopRightRadius="65px" width="100%" flex="1" margin="0px auto">
            <EstablishmentForm session={session} nome='' descricao='' imageUrl='' lat='' lng='' registerForm={true} clickBackButton={()=>{router.push('entrepreneur')}}/>
        </Flex>
        
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
