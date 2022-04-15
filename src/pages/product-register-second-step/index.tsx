import { Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { FaShoppingBag } from 'react-icons/fa';
import { SecondProductForm } from '../../components/product-register-second-step/second-product-form';

const ProductRegisterSecondStep = () => {
    return (
        <>
            <Flex
                bg="product_bg_purple"
                height="100vh"
                align="center"
                direction="column"
            >
                <Heading
                    as="h1"
                    fontSize="1.8rem"
                    color="default_white"
                    margin="40px 0px"
                >
                    <Stack direction="row" spacing={2} align="center">
                        <Text>Cadastre seu produto!</Text>
                        <Icon as={FaShoppingBag}></Icon>
                    </Stack>
                </Heading>
                <SecondProductForm />
            </Flex>
        </>
    );
};

export default ProductRegisterSecondStep;
