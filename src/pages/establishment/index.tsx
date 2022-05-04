import {
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DefaultHeader } from '../../components/shared/default-header';
import { FooterMenu } from '../../components/shared/footer-menu';
import { FaPlus } from 'react-icons/fa';
import { DefaultCard } from '../../components/shared/default-card';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

const Establishment = () => {
  return (
    <>
      <Flex width="100%" bg="primary" direction="column">
        <DefaultHeader />
        <Stack
          margin="20px auto 50px auto"
          maxW="400px"
          align="center"
          justify="center"
          color="default_white"
          spacing={1}
        >
          <Img
            src="vercel.svg"
            width="80px"
            height="80px"
            borderRadius="full"
          />
          <Heading as="h3">Estabelecimento 1</Heading>
        </Stack>
        <Flex
          bg="secondary"
          direction="column"
          borderTopRadius="56px"
          height="100%"
        >
          <Flex maxW="250px" margin="0px auto">
            <Button
              bg="default_orange"
              _hover={{ bg: 'default_orange_hover' }}
              color="default_white"
              width="100%"
              height="50px"
              boxShadow="xl"
              borderRadius="2xl"
              position="relative"
              top="-23px"
            >
              <Stack
                direction="row"
                align="center"
                justify="center"
                spacing={4}
              >
                <Icon as={FaPlus} />
                <Text>Cadastrar novos produtos</Text>
              </Stack>
            </Button>
          </Flex>
          <Flex
            direction="column"
            margin="0px auto"
            align="center"
            marginBottom="100px"
          >
            <Text fontSize="18px" fontWeight="bold" marginBottom="20px">
              Seus produtos cadastrados
            </Text>
            <Stack spacing={4}>
              <DefaultCard name="Produto 1" img="Shop.svg" />
              <DefaultCard name="Produto 2" img="Shop.svg" />
              <DefaultCard name="Produto 3" img="Shop.svg" />
            </Stack>
          </Flex>
          <FooterMenu />
        </Flex>
      </Flex>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({ req });

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

export default Establishment;
