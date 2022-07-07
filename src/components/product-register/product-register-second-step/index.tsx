import { Flex } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { HeaderTitle } from '../../shared/header-title';
import { SecondProductForm } from '../second-product-form';
import { useProductForm } from '../../../hooks/product-form';
import { ProductSecondHalfImage } from './product-second-half-image';

export const ProductRegisterSecondStep = () => {
  const {setStage} = useProductForm();
  return (
    <>
      <Flex
        bg="secondary"
        minH="100vh"
        direction={{base: "column", lg: "row"}}
      >
        <Flex display={{base: "flex", lg: "none"}} height="100%" bg="primary" width="100%" borderBottomRightRadius="50px">
          <HeaderTitle text="Cadastre seu produto!" icon={FaShoppingBag} />
        </Flex>
        <Flex width="100%"
          height="100%"
          flex="1"
          bg="secondary"
          padding="30px 0px"
          margin="auto"
          borderTopLeftRadius={{base: "65px", lg: "0px"}}> 
            <SecondProductForm name='' description='' price='' registerForm={true} clickBackButton={()=>setStage('first')} />
          </Flex>
        <Flex width="45%" display={{base: "none", lg: "flex"}}>
          <ProductSecondHalfImage />
        </Flex>
      </Flex>
    </>
  );
};
