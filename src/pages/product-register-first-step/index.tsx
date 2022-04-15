import { Flex, Img } from '@chakra-ui/react';
import { ItemRegisterForm } from '../../components/item-register/item-register-form';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';

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

export default ProductRegisterFirstStep;
