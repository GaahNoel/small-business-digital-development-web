import { Button, ButtonGroup, Flex, Stack } from '@chakra-ui/react';
import { useState } from 'react';
import { FooterMenu } from '../../components/shared/footer-menu';
import { SwitchButton } from '../../components/shared/switch-button';
import { ConsumerItems } from '../../components/shop/consumer-items';
import { EntrepreneurItems } from '../../components/shop/entrepreneur-items';
import { ShopHeader } from '../../components/shop/shop-header';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';

const Shop = () => {
  const [formOption, setFormOption] = useState('Consumidor');

  const changeOption = (option: string) => {
    console.log(option);
    if (formOption != option) {
      setFormOption(option);
    }
  };

  return (
    <>
      <Flex direction="column" bg="secondary">
        <Stack
          bg="primary"
          spacing={2}
          borderBottomRadius="90px"
          height="25vh"
          marginBottom="20px"
        >
          <ShopHeader />
          <Flex justify="center">
            <ButtonGroup
              spacing={0}
              padding="2px"
              bg="secondary"
              borderRadius="14px"
            >
              {formOption === 'Consumidor' ? (
                <>
                  <Button
                    bg="default_orange"
                    color="default_white"
                    borderRadius="14px"
                    onClick={() => {
                      changeOption('Consumidor');
                    }}
                  >
                    Consumidor
                  </Button>
                  <Button
                    bg="secondary"
                    color="primary"
                    borderRadius="14px"
                    onClick={() => {
                      changeOption('Empreendedor');
                    }}
                  >
                    Empreendedor
                  </Button>
                </>
              ) : (
                <>
                  <Button
                    bg="secondary"
                    color="primary"
                    borderRadius="14px"
                    onClick={() => {
                      changeOption('Consumidor');
                    }}
                  >
                    Consumidor
                  </Button>
                  <Button
                    bg="default_orange"
                    color="default_white"
                    borderRadius="14px"
                    onClick={() => {
                      changeOption('Empreendedor');
                    }}
                  >
                    Empreendedor
                  </Button>
                </>
              )}
            </ButtonGroup>
          </Flex>
        </Stack>
        {formOption === 'Consumidor' ? (
          <ConsumerItems />
        ) : (
          <EntrepreneurItems />
        )}
        <FooterMenu />
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

export default Shop;
