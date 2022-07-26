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
import { ShopTypeButton } from '../../components/shop/shop-type-button';
import { Missions } from '../../components/shop/missions';

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
              <Flex
                direction={{ base: 'column', md: 'row' }}
                gap={{ base: 6, md: 0 }}
                justify="space-between"
                align="center"
                margin="50px 0px"
              >
                <ButtonGroup
                  id="options"
                  bg="secondary"
                  borderRadius="14px"
                  width={{ base: '100%', md: '50%' }}
                  spacing={0}
                >
                  <ShopTypeButton
                    text="Consumidor"
                    type="Consumidor"
                    typeSelected={formOption}
                    onClick={() => {
                      changeOption('Consumidor');
                    }}
                  />
                  <ShopTypeButton
                    text="Empreendedor"
                    type="Empreendedor"
                    typeSelected={formOption}
                    onClick={() => {
                      changeOption('Empreendedor');
                    }}
                  />
                  <ShopTypeButton
                    text="Missões"
                    type="Missões"
                    typeSelected={formOption}
                    onClick={() => {
                      changeOption('Missões');
                    }}
                  />
                </ButtonGroup>
                <Stack
                  id="coins"
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
              width="100%"
              maxW={{ base: '90%', md: '700px', lg: '900px' }}
              margin="40px auto"
            >
              {formOption === 'Consumidor' ? (
                <ConsumerItems />
              ) : (
                <>
                  <EntrepreneurItems />
                  <Missions />
                </>
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
