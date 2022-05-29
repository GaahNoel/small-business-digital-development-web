import { Flex } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { HeaderTitle } from '../../shared/header-title';
import { SecondProductForm } from '../second-product-form';
import { useProductForm } from '../../../hooks/product-form';

export const ProductRegisterSecondStep = () => {
  const {setStage} = useProductForm();
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
        <Flex width="100%"
          height="100%"
          flex="1"
          margin="0px auto"
          bg="secondary"
          padding="30px 0px"
          borderTopLeftRadius="65px"> 
            <SecondProductForm name='' description='' price='' registerForm={true} clickBackButton={()=>setStage('first')} />
          </Flex>
      </Flex>
    </>
  );
};
