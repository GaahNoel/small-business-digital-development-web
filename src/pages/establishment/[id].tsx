import {
  Button,
  Flex,
  Grid,
  GridItem,
  Heading,
  Icon,
  Image,
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
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { api } from '../../service/api';
import { NoItemsText } from '../../components/shared/no-items-text';
import { useProductForm } from '../../hooks/product-form';
import { ProductModal } from '../../components/establishment/product-modal';
import Swal from 'sweetalert2';
import { toast } from 'react-toastify';
import { ProductEditModal } from '../../components/establishment/product-edit-modal';
import {
  default_orange,
  default_yellow,
  empty_gray,
  service_blue,
} from '../../styles/theme';
import { CouponInfo } from '../../components/shared/coupon-info';

type ParamsProps = {
  id: string;
};

type EstablishmentProps = {
  id: string;
  name: string;
  description: string;
  accountId: string;
  imageUrl: string;
  latitude: string;
  longitude: string;
  street: string;
  city: string;
  state: string;
  zip: string;
  country: string;
  maxPermittedCouponPercentage: number;
};

type ProductProps = {
  id: string;
  name: string;
  listPrice: number;
  salePrice: number;
  description: string;
  createdAt?: string;
  businessId?: string;
  imageUrl: string;
  type?: string;
  category?: {
    id: string;
    name: string;
  };
};

type ProductsProps = {
  token: string;
  products: ProductProps[];
  establishmentInfo: EstablishmentProps;
};

type ProductsStateProps = ProductProps[];

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

type EstablishmentBaseProps = {
  id: string;
  name: string;
};

const Establishment = ({
  token,
  products,
  establishmentInfo,
}: ProductsProps) => {
  const router = useRouter();
  const [establishmentBase, setEstablishmentBase] =
    useState<EstablishmentBaseProps>({
      id: '',
      name: '',
    });
  const { form, setStage } = useProductForm();
  const { setToken } = form;
  const {
    isOpen: viewProductIsOpen,
    onOpen: viewProductOnOpen,
    onClose: viewProductOnClose,
  } = useDisclosure();
  const {
    isOpen: editProductIsOpen,
    onOpen: editProductOnOpen,
    onClose: editProductOnClose,
  } = useDisclosure();
  const [productModal, setProductModal] = useState<ProductModalProps>();
  const [productsState, setProductsState] = useState<ProductsStateProps>([
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

  const couponArray = [
    { color: empty_gray, value: 0 },
    { color: default_yellow, value: 5 },
    { color: default_orange, value: 7 },
    { color: service_blue, value: 10 },
  ];

  useEffect(() => {
    setProductsState(products);
    setToken(token);
    setEstablishmentBase({
      id: establishmentInfo.id,
      name: establishmentInfo.name,
    });
  }, []);

  const getCouponColor = () => {
    const couponIndex = couponArray.findIndex((coupon) => {
      return coupon.value === establishmentInfo.maxPermittedCouponPercentage;
    });
    return couponArray[couponIndex].color;
  };

  const clickNewProduct = (id: string) => {
    setStage('first');
    router.push(`/product-register/${id}`);
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
    editProductOnOpen();
  };

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

  const updateProductState = (id: string, productFound: ProductProps) => {
    const index = productsState.findIndex((product) => {
      if (product.id === id) return true;
    });
    productsState[index] = {
      ...productsState[index],
      ...productFound,
    };
    const newProductState: ProductsStateProps = productsState;
    setProductsState(newProductState);
  };

  return (
    <>
      <Flex width="100%" minH="100vh" bg="primary" direction="column">
        <Flex
          direction="column"
          width={{ base: '90%', md: '80%', lg: '60%' }}
          margin="20px auto"
        >
          <DefaultHeader />
          <Stack
            margin="20px auto 50px auto"
            maxW={{ base: '400px', md: '800px' }}
            align="center"
            justify="center"
            textAlign="center"
            color="default_white"
            spacing={1}
          >
            <Image
              objectFit="cover"
              src={establishmentInfo.imageUrl}
              fallbackSrc="/imgLoader.gif"
              width={{ base: '120px', md: '200px', lg: '240px' }}
              height={{ base: '120px', md: '200px', lg: '240px' }}
              borderRadius="full"
            />
            <Flex maxWidth="1000px" wordBreak="break-all">
              <Heading
                as="h3"
                fontSize={{
                  base: '30px',
                  md: '40px',
                  lg: '50px',
                  '2xl': '60px',
                }}
              >
                {establishmentInfo.name}
              </Heading>
            </Flex>
            <Flex
              direction="column"
              textAlign="center"
              fontSize={{ base: '15px', md: '18px', lg: '20px', '2xl': '22px' }}
            >
              <Text>Estado: {establishmentInfo.state}</Text>
              <Text>
                Cidade:{' '}
                {establishmentInfo.city === establishmentInfo.country
                  ? establishmentInfo.state
                  : establishmentInfo.city}{' '}
              </Text>
              {establishmentInfo.street && (
                <Text>Localização: {establishmentInfo.street}</Text>
              )}
            </Flex>
          </Stack>
        </Flex>
        <Flex
          bg="secondary"
          direction="column"
          borderTopRadius="56px"
          height="100%"
          flex="1"
        >
          <Flex
            maxW={{ base: '250px', sm: '320px', md: '400px' }}
            width="100%"
            margin="0px auto"
          >
            <Button
              bg="default_orange"
              _hover={{ bg: 'default_orange_hover' }}
              color="default_white"
              width="100%"
              height={{ base: '50px', sm: '70px', md: '90px' }}
              boxShadow="xl"
              borderRadius="2xl"
              position="relative"
              top={{ base: '-23px', sm: '-35', md: '-45' }}
              onClick={() => {
                clickNewProduct(establishmentInfo.id);
              }}
            >
              <Stack
                direction="row"
                align="center"
                justify="center"
                fontSize={{ base: '16px', md: '22px' }}
                spacing={4}
              >
                <Icon as={FaPlus} />
                <Text>Cadastrar novos produtos</Text>
              </Stack>
            </Button>
          </Flex>
          <ProductEditModal
            establishmentBase={establishmentBase}
            id={productModal?.id as string}
            name={productModal?.name as string}
            description={productModal?.description as string}
            price={productModal?.listPrice as number}
            imageUrl={productModal?.imageUrl as string}
            isOpen={editProductIsOpen}
            onClose={editProductOnClose}
            updateState={updateProductState}
          />
          <ProductModal
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
          <Flex align="center" direction="column" paddingBottom="40px">
            <Stack direction="column" spacing={3}>
              <Text
                fontSize={{ base: '18px', sm: '22px', md: '24px', lg: '28px' }}
                fontWeight="bold"
                color="primary"
              >
                {`Disponíveis cupons até`}
              </Text>
              <CouponInfo
                iconColor={getCouponColor()}
                text={`${establishmentInfo.maxPermittedCouponPercentage}%`}
              />
            </Stack>
          </Flex>
          <Flex
            direction="column"
            margin="0px auto"
            align="center"
            marginBottom="100px"
          >
            <Text
              fontSize={{ base: '18px', sm: '22px', md: '24px', lg: '28px' }}
              fontWeight="bold"
              color="primary"
              marginBottom="20px"
            >
              Seus produtos cadastrados
            </Text>
            <Stack
              spacing={4}
              width="100%"
              align="center"
              display={{ base: 'flex', md: 'none' }}
            >
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
                        type: product?.type as string,
                        categoryName: product.category?.name as string,
                        imageUrl: product.imageUrl,
                      });
                    }}
                    editItem={(event) => {
                      event.stopPropagation();
                      editProduct({
                        id: product.id,
                        name: product.name,
                        description: product.description,
                        listPrice: product.listPrice,
                        salePrice: product.salePrice,
                        type: product?.type as string,
                        categoryName: product.category?.name as string,
                        imageUrl: product.imageUrl,
                      });
                    }}
                    removeItem={(event) => {
                      event.stopPropagation();
                      removeProduct(product.id, token);
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
            <Flex align="center" justify="center">
              <Grid
                width="100%"
                templateColumns={{ md: 'repeat(1, 1fr)', lg: 'repeat(2, 1fr)' }}
                display={{ base: 'none', md: 'grid' }}
                gap={6}
              >
                {productsState.length > 0 ? (
                  productsState.map((product, key) => (
                    <GridItem colSpan={1} key={key}>
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
                            type: product?.type as string,
                            categoryName: product.category?.name as string,
                            imageUrl: product.imageUrl,
                          });
                        }}
                        editItem={(event) => {
                          event.stopPropagation();
                          editProduct({
                            id: product.id,
                            name: product.name,
                            description: product.description,
                            listPrice: product.listPrice,
                            salePrice: product.salePrice,
                            type: product?.type as string,
                            categoryName: product.category?.name as string,
                            imageUrl: product.imageUrl,
                          });
                        }}
                        removeItem={(event) => {
                          event.stopPropagation();
                          removeProduct(product.id, token);
                        }}
                        key={key}
                      />
                    </GridItem>
                  ))
                ) : (
                  <GridItem colSpan={{ base: 1, lg: 2 }} key="0 products">
                    <NoItemsText
                      color="primary"
                      text="Nenhum produto cadastrado para o estabelecimento."
                    />
                  </GridItem>
                )}
              </Grid>
            </Flex>
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

const getEstablishmentInfo = async (id: string) => {
  const response = await api.get(`business/${id}`);
  console.log(response.data);
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
  const establishmentInfo = await getEstablishmentInfo(id);

  if (!token) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { products, establishmentInfo, token },
  };
};

export default Establishment;
