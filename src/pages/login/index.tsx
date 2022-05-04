import { Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { LoginButton } from '../../components/login/login-button';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { FaFacebookSquare, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

const Login = () => {
  return (
    <>
      <Flex bg="secondary" direction="column" height="100vh">
        <HeaderHalfCircleTop>
          <Image boxSize="150px" src="Shop.svg" alt="Shop" />
        </HeaderHalfCircleTop>

        <Stack
          direction="column"
          align="center"
          justify="center"
          margin="auto"
          spacing={4}
        >
          <Flex
            width="100%"
            maxWidth="300px"
            margin="20px auto"
            direction="column"
          >
            <Heading as="h3" fontSize="18px" textAlign="center">
              <Text color="default_black">Entre e venha aproveitar nossos</Text>
              <Text color="primary">Produtos e Serviços</Text>
            </Heading>
          </Flex>
          <Stack
            direction="column"
            align="center"
            width="100%"
            maxWidth="300px"
            margin="20px auto"
            spacing={4}
          >
            <LoginButton
              text="Facebook"
              colorButton="facebook_blue"
              colorText="default_white"
              icon={FaFacebookSquare}
              provider="facebook"
            />
            <LoginButton
              text="Google"
              colorButton="default_white"
              colorText="default_black"
              icon={FaGoogle}
              provider="google"
            />
            <LoginButton
              text="Email"
              colorButton="light_purple"
              colorText="default_white"
              icon={FaRegEnvelope}
              provider="custom"
            />
          </Stack>
        </Stack>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({ req });

  if (session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
