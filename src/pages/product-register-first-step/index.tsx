import { Flex, Img } from '@chakra-ui/react';
import { ItemRegisterForm } from '../../components/item-register/item-register-form';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

const ProductRegisterFirstStep = () => {
  return (
    <>
      <Flex bg="secondary" direction="column" height="100vh">
        <HeaderHalfCircleTop>
          <Flex width="100%" maxWidth="300px" justify="center">
            <Img src="Item.svg"></Img>
          </Flex>
        </HeaderHalfCircleTop>
        <ItemRegisterForm />
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

export default ProductRegisterFirstStep;
