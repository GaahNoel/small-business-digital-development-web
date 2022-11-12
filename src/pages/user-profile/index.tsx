import {
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  ScaleFade,
  Text,
} from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { HeaderTitle } from '../../components/shared/header-title';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { EstablishmentHalfImage } from '../../components/establishment-register/establishment-half-image';
import { useState } from 'react';
import jwt_decode from 'jwt-decode';
import { api } from '../../service/api';
import { UserEditForm } from '../../components/user-profile/user-edit-form';
import axios from 'axios';
import { FiCheckCircle, FiXCircle } from 'react-icons/fi';
import { routerNavigateUrl } from '../../utils/router-navigate';

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
  const [isEditMounted, setIsEditMounted] = useState(false);
  const [isUserInfoMounted, setIsUserInfoMounted] = useState(true);

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
          <HeaderTitle text="Acesse suas informações!" icon={FaShoppingBag} />
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
          justify={'center'}
          sx={{
            '> div': {
              width: '100%',
            },
          }}
        >
          <ScaleFade
            in={isUserInfoMounted}
            unmountOnExit={true}
            onUnmount={() => {
              setIsEditMounted(true);
            }}
          >
            <UserSelection
              setIsOpened={setIsUserInfoMounted}
              userInfo={userInfos}
            />
          </ScaleFade>
          <ScaleFade
            in={isEditMounted}
            unmountOnExit={true}
            onUnmount={() => {
              setIsEditMounted(false);
              setIsUserInfoMounted(true);
            }}
          >
            <UserEditForm
              token={session}
              id={id}
              name={userInfos.name}
              setIsOpen={setIsEditMounted}
            />
          </ScaleFade>
        </Flex>
      </Flex>
    </>
  );
};

const getUserInfos = async (id: string, token: string) => {
  try {
    console.log(id);
    const response = await api.get(`account/${id}`, {
      headers: {
        token,
      },
    });

    return response.data;
  } catch (error) {
    // if (axios.isAxiosError(error)) console.error(error);
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

  const { id } = jwt_decode(session) as {
    id: string;
  };

  const userInfos = await getUserInfos(id, session);

  return {
    props: { session, id, userInfos },
  };
};

type UserInfo = {
  userInfo: {
    name: string;
    email: string;
    verified: boolean;
  };
  setIsOpened: (value: boolean) => void;
};

export const UserSelection = ({ userInfo, setIsOpened }: UserInfo) => {
  const router = useRouter();
  const verifiedProps = userInfo.verified
    ? {
        icon: FiCheckCircle,
        color: 'success_green',
        title: 'Verificado',
      }
    : {
        icon: FiXCircle,
        color: 'error_red',
        title: 'Não verificado',
      };

  return (
    <Flex
      direction={'column'}
      align="center"
      justifyContent={'center'}
      flex={1}
      maxWidth={{ base: '90vw', md: '50vw', lg: '40vw', xl: '40vw' }}
      borderRadius="3xl"
      bg="default_white"
      boxShadow="-14px 15px 15px -8px rgba(0,0,0,0.35);"
      padding={{ base: '25px', md: '25px 50px' }}
      margin={'0 auto'}
      width="100%"
    >
      <Flex direction="column" paddingBottom={50} width="100%" align={'center'}>
        <Box position={'relative'} width="100%" justifyContent={'center'}>
          <Button
            position={'relative'}
            left="0"
            onClick={() => {
              router.push('/');
            }}
            bg="default_black"
            color="secondary"
            _hover={{ bg: 'rgba(0,0,0,0.8)' }}
          >
            Voltar
          </Button>
          <Heading
            color="primary"
            textTransform={'uppercase'}
            textAlign={'center'}
          >
            {userInfo.name}
          </Heading>
        </Box>

        <Flex gap={10} align={'center'}>
          <Text color="primary" opacity={0.6}>
            {userInfo.email}
          </Text>
          <Flex alignItems="center" gap={1}>
            <Icon color={verifiedProps.color} as={verifiedProps.icon}></Icon>
            <Text color={verifiedProps.color}>{verifiedProps.title}</Text>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        width="100%"
        gap={5}
        justifyContent={'space-between'}
        wrap={{
          base: 'wrap',
          '2xl': 'nowrap',
        }}
        align="center"
        sx={{
          button: {
            boxShadow: 'base',
            bg: 'secondary',
            color: 'primary',
            width: '100%',
            '&:hover': {
              bg: 'primary',
              color: 'secondary',
            },
          },
        }}
      >
        <Button onClick={() => setIsOpened(false)}>Editar dados</Button>
        <Button onClick={() => routerNavigateUrl(router, 'entrepreneur')}>
          Meus estabelecimentos
        </Button>
        <Button onClick={() => routerNavigateUrl(router, 'order-list')}>
          Meus pedidos
        </Button>
      </Flex>
    </Flex>
  );
};

export default UserEdit;
