import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { SecondProductForm } from '../../components/product-register-second-step/second-product-form';
import { HeaderTitle } from '../../components/shared/header-title';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

const ProductRegisterSecondStep = () => {
  return (
    <>
      <Flex bg="primary" height="100vh" align="center" direction="column">
        <HeaderTitle text="Cadastre seu produto!" icon={FaShoppingBag} />
        <SecondProductForm />
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

export default ProductRegisterSecondStep;
