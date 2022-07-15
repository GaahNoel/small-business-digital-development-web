import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { EstablishmentForm } from '../../components/establishment-register/establishment-form';
import { HeaderTitle } from '../../components/shared/header-title';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { EstablishmentHalfImage } from '../../components/establishment-register/establishment-half-image';
import { useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { api } from '../../service/api';
import { userInfo } from 'os';
import { UserEditForm } from '../../components/user-edit/user-edit-form';

type UserEditProps = {
  session: string;
  id: string;
  userInfos: UserInfos;
};

type UserInfos = {
  name: string;
  email: string;
  verified: boolean;
  provider: string;
};

const UserEdit = ({ session, id, userInfos }: UserEditProps) => {
  const router = useRouter();

  useEffect(() => {
    console.log(userInfos);
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
            text="Altere já suas informações!"
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
          <UserEditForm token={session} id={id} name={userInfos.name} />
        </Flex>
      </Flex>
    </>
  );
};

const getUserInfos = async (id: string, token: string) => {
  try {
    const response = await api.get(`account/${id}`, {
      params: {
        token,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
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

  const { sub: id } = jwt_decode(session) as {
    sub: string;
  };

  const userInfos = await getUserInfos(id, session);

  return {
    props: { session, id, userInfos },
  };
};

export default UserEdit;
