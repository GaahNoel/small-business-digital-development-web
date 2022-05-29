import {
  Button,
  Flex,
  Heading,
  Icon,
  Img,
  Modal,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { DefaultHeader } from '../../components/shared/default-header';
import { FooterMenu } from '../../components/shared/footer-menu';
import { FaPlus } from 'react-icons/fa';
import { DefaultCard } from '../../components/shared/default-card';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { getSession } from 'next-auth/react';
import Router, { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../service/api';
import { useEstablishmentForm } from '../../hooks/establishment-form';
import { NoItemsText } from '../../components/shared/no-items-text';
import { useProductForm } from '../../hooks/product-form';
import { EstablishmentModal } from '../../components/establishment/establishment-modal';
import Swal from 'sweetalert2';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { EstablishmentEditModal } from '../../components/establishment/establishment-edit-modal';

type ParamsProps = {
  id: string;
};

type ProductsProps = {
  token: string;
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
    category: {
      id: string;
      name: string;
    };
  }[];
};

type ProductModalProps = {
  id: string;
  name: string;
  description: string;
  listPrice: number;
  salePrice: number;
  type: string;
  imageUrl: string;
  categoryName: string;
};

const Establishment = ({ token, products }: ProductsProps) => {
  const router = useRouter();
  const { id, name, imageUrl } = useEstablishmentForm();
  const { form, setStage } = useProductForm();
  const { setEstablishmentId, setEstablishmentName, setToken } = form;
  const { isOpen: viewProductIsOpen, onOpen: viewProductOnOpen, onClose: viewProductOnClose } = useDisclosure();
  const { isOpen: editProductIsOpen, onOpen: editProductOnOpen, onClose: editProductOnClose } = useDisclosure();
  const [productModal, setProductModal] = useState<ProductModalProps>();
  const [productsState, setProductsState] = useState([
    {
      id: '',
      name: '',
      listPrice: 0,
      salePrice: 0,
      description: '',
      createdAt: '',
      businessId: '',
      imageUrl: '',
      type: '',
      category: {
        id: '',
        name: '',
      },
    },
  ]);

  useEffect(() => {
    setProductsState(products);
    setToken(token);
  }, []);

  const clickNewProduct = (id: string, name: string) => {
    setEstablishmentId(id);
    setEstablishmentName(name);
    setStage('first');
    router.push('/product-register');
  };

  const openModal = ({
    id,
    name,
    description,
    listPrice,
    salePrice,
    type,
    imageUrl,
    categoryName,
  }: ProductModalProps) => {
    setProductModal({
      id,
      name,
      description,
      listPrice,
      salePrice,
      type,
      imageUrl,
      categoryName,
    });
    viewProductOnOpen();
  };

  const editProduct = ({
    id,
    name,
    description,
    listPrice,
    salePrice,
    type,
    imageUrl,
    categoryName,
  }: ProductModalProps) =>{
    setProductModal({
      id,
      name,
      description,
      listPrice,
      salePrice,
      type,
      imageUrl,
      categoryName,
    });
    editProductOnOpen();
  }

  const removeProductApi = async (productId: string, token: string) => {
    try {
      const response = await api.delete(`product/delete/${productId}`, {
        headers: {
          'content-type': 'application/json',
          token,
        },
      });
      setProductsState(
        productsState.filter((product) => {
          return product.id !== productId;
        }),
      );
      toast.success('Produto apagado com sucesso!');
    } catch (e: any) {
      console.log(e);
    }
  };

  const removeProduct = (productId: string, token: string) => {
    Swal.fire({
      title: 'Tem certeza que deseja excluir o produto?',
      showDenyButton: true,
      confirmButtonText: 'Não',
      denyButtonText: `Sim`,
    }).then((result) => {
      if (!result.isConfirmed) {
        removeProductApi(productId, token);
      }
    });
  };

  return (
    <>
      <ToastContainer />
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
          <EstablishmentEditModal id={productModal?.id as string} name={productModal?.name as string}  description={productModal?.description as string} price={productModal?.listPrice as number} imageUrl={productModal?.imageUrl as string} isOpen={editProductIsOpen}
            onClose={editProductOnClose}/>
          <EstablishmentModal
            name={productModal?.name as string}
            description={productModal?.description as string}
            type={
              productModal?.type === 'product'
                ? 'Produto'
                : ('Serviço' as string)
            }
            grossPrice={productModal?.listPrice as number}
            netPrice={productModal?.salePrice as number}
            imageUrl={productModal?.imageUrl as string}
            categoryName={productModal?.categoryName as string}
            isOpen={viewProductIsOpen}
            onClose={viewProductOnClose}
          />
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
              {productsState.length > 0 ? (
                productsState.map((product, key) => (
                  <DefaultCard
                    name={product.name}
                    img={product.imageUrl}
                    detailClick={() => {
                      openModal({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        listPrice: product.listPrice,
                        salePrice: product.salePrice,
                        type: product.type,
                        categoryName: product.category.name,
                        imageUrl: product.imageUrl,
                      });
                    }}
                    editItem={()=> editProduct({
                      id: product.id,
                      name: product.name,
                      description: product.description,
                      listPrice: product.listPrice,
                      salePrice: product.salePrice,
                      type: product.type,
                      categoryName: product.category.name,
                      imageUrl: product.imageUrl,
                    })}
                    removeItem={() => removeProduct(product.id, token)}
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
  console.log(response);
  return response.data;
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const token = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });
  const { id } = params as ParamsProps;

  const products = await getProductList(id);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { products, token },
  };
};

export default Establishment;
