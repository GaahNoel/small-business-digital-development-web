import { Flex } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { HeaderTitle } from '../../shared/header-title';
import { SecondProductForm } from '../second-product-form';

export const ProductRegisterSecondStep = () => {
  return (
    <>
      <Flex
        bg="primary"
        minH="100vh"
        height="100%"
        align="center"
        direction="column"
      >
        <HeaderTitle text="Cadastre seu produto!" icon={FaShoppingBag} />
        <SecondProductForm />
      </Flex>
    </>
  );
};
