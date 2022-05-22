import {
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  Stack,
  Text,
} from '@chakra-ui/react';
import { DefaultHeader } from '../../components/shared/default-header';
import { FooterMenu } from '../../components/shared/footer-menu';
import { FaPlus } from 'react-icons/fa';
import { DefaultCard } from '../../components/shared/default-card';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useEffect } from 'react';
import { api } from '../../service/api';
import { useEstablishmentForm } from '../../hooks/establishment-form';
import { NoItemsText } from '../../components/shared/no-items-text';
import { useProductForm } from '../../hooks/product-form';

type ParamsProps = {
  id: string;
};

type ProductsProps = {
  products: {
    id: string;
    name: string;
    listPrice: number;
    salePrice: number;
    description: string;
    createdAt: string;
    businessId: string;
    imageUrl: string;
    type: string;
    categoryId: string;
  }[];
};

const Establishment = ({ products }: ProductsProps) => {
  const router = useRouter();
  const { id, name, imageUrl } = useEstablishmentForm();
  const { form } = useProductForm();
  const { setEstablishmentId, setEstablishmentName } = form;

  const clickNewProduct = (id: string, name: string) => {
    setEstablishmentId(id);
    setEstablishmentName(name);
    router.push('/product-register');
  };

  return (
    <>
      <Flex width="100%" minH="100vh" bg="primary" direction="column">
        <DefaultHeader />
        <Stack
          margin="20px auto 50px auto"
          maxW="400px"
          align="center"
          justify="center"
          color="default_white"
          spacing={1}
        >
          <Img
            src={imageUrl}
            width="120px"
            height="120px"
            borderRadius="full"
          />
          <Heading as="h3">{name}</Heading>
        </Stack>
        <Flex
          bg="secondary"
          direction="column"
          borderTopRadius="56px"
          height="100%"
          flex="1"
        >
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
                clickNewProduct(id, name);
              }}
            >
              <Stack
                direction="row"
                align="center"
                justify="center"
                spacing={4}
              >
                <Icon as={FaPlus} />
                <Text>Cadastrar novos produtos</Text>
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
              Seus produtos cadastrados
            </Text>
            <Stack spacing={4}>
              {products.length > 0 ? (
                products.map((product, key) => (
                  <DefaultCard
                    name={product.name}
                    img={product.imageUrl}
                    detailClick={() => {
                      console.log('a');
                    }}
                    key={key}
                  />
                ))
              ) : (
                <NoItemsText
                  color="primary"
                  text="Nenhum produto cadastrado para o estabelecimento."
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

const getProductList = async (id: string) => {
  const response = await api.get(`product/list/${id}`);
  return response.data;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { id } = params as ParamsProps;

  const products = await getProductList(id);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { products },
  };
};

export default Establishment;
