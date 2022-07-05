import { Box, Flex, Heading, Image, Stack, Text } from '@chakra-ui/react';
import { LoginButton } from '../../components/login/login-button';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { FaFacebookSquare, FaGoogle, FaRegEnvelope } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import { LeftImage } from '../../components/login/left-image';
import { FooterMenu } from '../../components/shared/footer-menu';

const Login = () => {
  return (
    <>
      <Flex bg="secondary" direction={{base: "column", lg: "row"}} height="100vh" align={{base: "initial", lg: "center"}}>
        <Box width="100%" display={{base: "block", lg: "none"}}>
          <HeaderHalfCircleTop>
            <Image boxSize={{base: "150px", sm: "225px", md: "300px", lg: "400px", xl: "500px", "2xl": "600px"}} maxWidth="80%" src="Shop.svg" alt="Shop" />
          </HeaderHalfCircleTop>
        </Box>
        <Flex width={{md: "40%", lg: "60%"}} display={{base: "none", lg: "flex"}}>
          <LeftImage />
        </Flex>
        <Stack
          direction="column"
          align="start"
          justify="center"
          margin={{base: "auto", xl:"20px"}}
          position="relative"
          top={{base:"-30", lg: "0"}}
          left={{base: "0", xl: "-10%"}}
          border="2px #000"
          borderRadius="3xl"
          shadow="lg"
          bg="default_white"
          boxShadow="-14px 15px 15px -8px rgba(0,0,0,0.35);"
          padding={{base: "25px",md:"50px"}}
          spacing={4}
        >
          <Flex
            width="100%"
            maxWidth="300px"
            margin="0px auto 20px auto"
            direction="column"
          >
            <Heading as="h3" textAlign="center">
              <Text color="default_black" fontSize={{base: "18px", lg: "20px"}}>Entre e venha aproveitar nossos</Text>
              <Text color="primary" fontSize={{base: "22px", lg: "26px"}}>Produtos e Serviços</Text>
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
      <FooterMenu />
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

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
