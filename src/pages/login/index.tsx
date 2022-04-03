import { Flex, Heading, Image, Stack } from '@chakra-ui/react';
import LoginButton from '../../components/login/login-button';
import { FaFacebookSquare, FaGoogle, FaRegEnvelope } from 'react-icons/fa';

const Login = () => {
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
          <Image
            boxSize="150px"
            objectFit="cover"
            src="https://runeterraccg.com/wp-content/themes/hueman-pro-child/media/championtiles/Zoe.png"
            alt="Dan Abramov"
          />
        </Flex>
        <Flex
          width="100%"
          maxWidth="300px"
          margin="20px auto"
          direction="column"
          align="center"
        >
          <Heading as="h3" fontSize="18px" color="default_black">
            Entre e venha aproveitar nossos
          </Heading>
          <Heading as="h3" fontSize="18px" color="primary">
            Produtos e Serviços
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
          />
          <LoginButton
            text="Google"
            colorButton="default_white"
            colorText="default_black"
            icon={FaGoogle}
          />
          <LoginButton
            text="Email"
            colorButton="purple_email_button"
            colorText="default_white"
            icon={FaRegEnvelope}
          />
        </Stack>
      </Flex>
    </>
  );
};

export default Login;
