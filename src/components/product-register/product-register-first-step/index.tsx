import { Flex, Img } from '@chakra-ui/react';
import { ItemRegisterForm } from '../../item-register/item-register-form';
import { HeaderHalfCircleTop } from '../../shared/header-half-circle-top';
import { HalfImage } from './half-image';

type ProductRegisterFirstStepProps = {
  categories: { id: string; name: string }[];
};

export const ProductRegisterFirstStep = ({
  categories,
}: ProductRegisterFirstStepProps) => {
  return (
    <>
      <Flex bg="secondary" direction={{base: "column", lg: "row"}} minHeight="100vh">
        <Flex display={{base: "flex", lg: "none"}} align="center" justify="center" width="100%">
          <HeaderHalfCircleTop>
            <Flex width="100%" maxWidth="300px" justify="center">
              <Img src="Item.svg"></Img>
            </Flex>
          </HeaderHalfCircleTop>
        </Flex>
        <Flex width="45%" display={{base: "none", lg: "flex"}}>
          <HalfImage />
        </Flex>
        <ItemRegisterForm categories={categories} />
      </Flex>
    </>
  );
};
