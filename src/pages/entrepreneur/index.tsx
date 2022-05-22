import { Button, Flex, Heading, Icon, Stack, Text } from '@chakra-ui/react';
import { DefaultHeader } from '../../components/shared/default-header';
import { FooterMenu } from '../../components/shared/footer-menu';
import { FaPlus } from 'react-icons/fa';
import { DefaultCard } from '../../components/shared/default-card';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { api } from '../../service/api';
import { getSession } from 'next-auth/react';
import { useEffect } from 'react';
import { Router, useRouter } from 'next/router';
import { useEstablishmentForm } from '../../hooks/establishment-form';
import { NoItemsText } from '../../components/shared/no-items-text';

type EnterpreneurProps = {
  businesses: {
    id: string;
    name: string;
    description: string;
    createdAt: string;
    imageUrl: string;
    latitude: string;
    longitude: string;
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  }[];
};

const Enterpreneur = ({ businesses }: EnterpreneurProps) => {
  const router = useRouter();
  const { setId, setName, setImageUrl } = useEstablishmentForm();

  const clickCard = (id: string, name: string, imageUrl: string) => {
    setId(id);
    setName(name);
    setImageUrl(imageUrl);
    router.push(`/establishment/${id}`);
  };

  return (
    <>
      <Flex width="100%" bg="primary" direction="column" minH="100vh">
        <DefaultHeader />
        <Stack
          margin="30px auto 90px auto"
          maxW="400px"
          align="center"
          justify="center"
          color="default_white"
          spacing={2}
        >
          <Heading as="h3">Área do empreendedor</Heading>
          <Text>Gerencie seus estabelecimentos e produtos</Text>
        </Stack>
        <Flex bg="secondary" direction="column" borderTopRadius="56px" flex="1">
          <Flex maxW="250px" margin="0px auto">
            <Button
              bg="default_orange"
              _hover={{ bg: 'default_orange_hover' }}
              color="default_white"
              width="100%"
              height="50px"
              boxShadow="xl"
              borderRadius="2xl"
              position="relative"
              top="-23px"
              onClick={() => {
                router.push('/establishment-register');
              }}
            >
              <Stack
                direction="row"
                align="center"
                justify="center"
                spacing={4}
              >
                <Icon as={FaPlus} />
                <Text>Cadastrar novos itens</Text>
              </Stack>
            </Button>
          </Flex>
          <Flex
            direction="column"
            margin="0px auto"
            align="center"
            marginBottom="100px"
          >
            <Text fontSize="18px" fontWeight="bold" marginBottom="20px">
              Seus estabelecimentos cadastrados
            </Text>
            <Stack spacing={4}>
              {businesses.length > 0 ? (
                businesses.map((establishment, key) => (
                  <DefaultCard
                    key={key}
                    name={establishment.name}
                    img={establishment.imageUrl}
                    detailClick={() => {
                      clickCard(
                        establishment.id,
                        establishment.name,
                        establishment.imageUrl,
                      );
                    }}
                  />
                ))
              ) : (
                <NoItemsText
                  color="primary"
                  text="Nenhum estabelecimento cadastrado para o usuário."
                />
              )}
            </Stack>
          </Flex>
          <FooterMenu />
        </Flex>
      </Flex>
    </>
  );
};

const getBusinessList = async (id: string) => {
  const response = await api.get(`business/list/${id}`, {});
  return response.data;
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req });

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  const businesses = await getBusinessList(session.id as string);

  return {
    props: { businesses },
  };
};

export default Enterpreneur;
