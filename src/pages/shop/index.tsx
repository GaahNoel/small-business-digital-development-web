import { Button, ButtonGroup, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useState } from 'react';
import { FooterMenu } from '../../components/shared/footer-menu';
import { ConsumerItems } from '../../components/shop/consumer-items';
import { EntrepreneurItems } from '../../components/shop/entrepreneur-items';
import { ShopHeader } from '../../components/shop/shop-header';
import { GetServerSideProps } from 'next';
import { getSession } from 'next-auth/react';
import { DefaultHeader } from '../../components/shared/default-header';
import { BsCoin } from 'react-icons/bs';

type ShopProps = {
  type: FormOption;
};

type FormOption = 'Consumidor' | 'Empreendedor' | 'Missões';

const Shop = ({ type }: ShopProps) => {
  const [formOption, setFormOption] = useState(type);

  const changeOption = (option: FormOption) => {
    console.log(option);
    if (formOption != option) {
      setFormOption(option);
    }
  };

  return (
    <>
      <>
        <Flex minHeight="100vh" direction="column" bg="primary">
          <Flex id="headers">
            <Flex
              width="100%"
              alignSelf="center"
              direction="column"
              maxW={{ base: '90%', md: '700px', lg: '900px' }}
              margin="0px auto"
            >
              <DefaultHeader />
              <Flex justify="space-between" margin="50px 0px">
                <ButtonGroup
                  spacing={2}
                  padding="2px"
                  bg="secondary"
                  borderRadius="14px"
                >
                  <Button
                    bg={formOption === 'Consumidor' ? 'default_orange' : 'none'}
                    _hover={
                      formOption === 'Consumidor'
                        ? { bg: 'default_orange_hover' }
                        : { bg: 'secondary_hover' }
                    }
                    color={
                      formOption === 'Consumidor' ? 'default_white' : 'primary'
                    }
                    borderRadius="14px"
                    onClick={() => {
                      changeOption('Consumidor');
                    }}
                  >
                    Consumidor
                  </Button>
                  <Button
                    bg={
                      formOption === 'Empreendedor' ? 'default_orange' : 'none'
                    }
                    _hover={
                      formOption === 'Empreendedor'
                        ? { bg: 'default_orange_hover' }
                        : { bg: 'secondary_hover' }
                    }
                    color={
                      formOption === 'Empreendedor'
                        ? 'default_white'
                        : 'primary'
                    }
                    borderRadius="14px"
                    onClick={() => {
                      changeOption('Empreendedor');
                    }}
                  >
                    Empreendedor
                  </Button>
                  <Button
                    bg={formOption === 'Missões' ? 'default_orange' : 'none'}
                    _hover={
                      formOption === 'Missões'
                        ? { bg: 'default_orange_hover' }
                        : { bg: 'secondary_hover' }
                    }
                    color={
                      formOption === 'Missões' ? 'default_white' : 'primary'
                    }
                    borderRadius="14px"
                    onClick={() => {
                      changeOption('Missões');
                    }}
                  >
                    Missões
                  </Button>
                </ButtonGroup>
                <Stack
                  bg="default_white"
                  borderRadius="14px"
                  color="default_yellow"
                  direction="row"
                  align="center"
                  justify="center"
                  padding="8px"
                  fontWeight="bold"
                  spacing={2}
                >
                  <Icon as={BsCoin} fontSize="28px" />
                  <Text>650 Moedas</Text>
                </Stack>
              </Flex>
            </Flex>
          </Flex>
          <Flex
            id="content"
            bg="secondary"
            direction="column"
            width="100%"
            height="100%"
            flex="1"
            borderTopRadius={{ base: '0px', md: '105px' }}
            paddingBottom={{ base: '80px', md: '0px' }}
          >
            <Flex
              maxW={{ base: '90%', md: '700px', lg: '900px' }}
              margin="0px auto"
            >
              {formOption === 'Consumidor' ? (
                <ConsumerItems />
              ) : (
                <EntrepreneurItems />
              )}
            </Flex>
          </Flex>
        </Flex>
        <FooterMenu />
      </>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  query,
}) => {
  const session = await getSession({ req });
  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  let type;
  if (query.type && query.type === 'mission') {
    type = 'Missões';
  } else {
    type = 'Consumidor';
  }

  return {
    props: { type },
  };
};

export default Shop;
