import { Flex, Img } from '@chakra-ui/react';
import { ItemRegisterForm } from '../../item-register/item-register-form';
import { HeaderHalfCircleTop } from '../../shared/header-half-circle-top';

type ProductRegisterFirstStepProps = {
  categories: string[];
};

export const ProductRegisterFirstStep = ({
  categories,
}: ProductRegisterFirstStepProps) => {
  return (
    <>
      <Flex bg="secondary" direction="column" height="100vh">
        <HeaderHalfCircleTop>
          <Flex width="100%" maxWidth="300px" justify="center">
            <Img src="Item.svg"></Img>
          </Flex>
        </HeaderHalfCircleTop>
        <ItemRegisterForm categories={categories} />
      </Flex>
    </>
  );
};
