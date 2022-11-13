import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { EstablishmentForm } from '../../components/establishment-register/establishment-form';
import { HeaderTitle } from '../../components/shared/header-title';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { EstablishmentHalfImage } from '../../components/establishment-register/establishment-half-image';
import { routerNavigateUrl } from '../../utils/router-navigate';
import { useEffect, useState } from 'react';
import { getSession } from 'next-auth/react';

type EstablishmentRegisterProps = {
  session: string;
};

const EstablishmentRegister = ({
  session: sessionServerSide,
}: EstablishmentRegisterProps) => {
  const router = useRouter();
  const [session, setSession] = useState(sessionServerSide);

  useEffect(() => {
    getSession().then((sessionInfos) => {
      const sessionFounded = sessionInfos as unknown as { token: string };
      setSession(sessionFounded.token);
    });
  }, []);

  return (
    <>
      <Flex
        bg={{ base: 'primary', lg: 'secondary' }}
        align={{ base: 'center', lg: 'stretch' }}
        direction={{ base: 'column', lg: 'row' }}
        minHeight="100vh"
        flex="1"
      >
        <Flex display={{ base: 'flex', lg: 'none' }}>
          <HeaderTitle
            text="Cadastre já seu estabelecimento!"
            icon={FaShoppingBag}
          />
        </Flex>
        <Flex width="45%" display={{ base: 'none', lg: 'flex' }} minH="100vh">
          <EstablishmentHalfImage />
        </Flex>
        <Flex
          bg="secondary"
          align="center"
          padding={{ base: '30px 0px', lg: '0px' }}
          minH="100vh"
          borderTopRightRadius={{ base: '65px', lg: '0px' }}
          width="100%"
          flex="1"
          margin="0px auto"
        >
          <EstablishmentForm
            session={session}
            nome=""
            descricao=""
            imageUrl=""
            lat=""
            lng=""
            maxPermittedCouponPercentage={0}
            registerForm={true}
            clickBackButton={async () => {
              router.push('entrepreneur');
            }}
          />
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
