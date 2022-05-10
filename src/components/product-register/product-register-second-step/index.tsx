import { Flex } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { HeaderTitle } from '../../shared/header-title';
import { SecondProductForm } from '../second-product-form';

export const ProductRegisterSecondStep = () => {
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
