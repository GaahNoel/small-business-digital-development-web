import {
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  IconButton,
  Input,
  Select,
  Spinner,
  Stack,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { GetServerSideProps } from 'next';
import { getToken } from 'next-auth/jwt';
import { useRouter } from 'next/router';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormCitySelect } from '../../components/shared/form-city-select';
import { FormInput } from '../../components/shared/form-input';
import { HeaderHalfCircleTop } from '../../components/shared/header-half-circle-top';
import { HeaderTitle } from '../../components/shared/header-title';
import { ListProductServiceCard } from '../../components/shared/list-product-service-card';
import { NoItemsText } from '../../components/shared/no-items-text';
import { api } from '../../service/api';
import { FiSearch } from 'react-icons/fi';
import { FormProductServiceSearch } from '../../components/shared/form-product-service-search';
import { FooterMenu } from '../../components/shared/footer-menu';
import { DefaultHeader } from '../../components/shared/default-header';
import { ProductServiceListModal } from '../../components/shared/product-service-list-modal';
import { InputType } from 'zlib';

type ProductListProps = {
  cities: CityOptions;
};

type Location = {
  lat: number;
  lng: number;
};

type Products = {
  business: {
    distance: number;
    id: string;
    latitude: string;
    longitude: string;
    name: string;
  };
  category: {
    id: string;
    name: string;
  };
  createdAt: string;
  description: string;
  id: string;
  imageUrl: string;
  listPrice: number;
  name: string;
  salePrice: number;
  type: string;
}[];

type CityOptions = {
  cities: string[];
  state: string;
}[];

type ItemModalProps = {
  id: string;
  name: string;
  description: string;
  listPrice: number;
  salePrice: number;
  type: string;
  imageUrl: string;
  categoryName: string;
};

const ProductList = ({ cities }: ProductListProps) => {
  const type = 'produto';
  const router = useRouter();
  const [location, setLocation] = useState<Location>();
  const [searchMode, setSearchMode] = useState('Loading');
  const [isLoadingCitySearch, setIsLoadingCitySearch] = useState(false);
  const [products, setProducts] = useState<Products>([]);
  const [filteredProducts, setFilteredProducts] = useState<Products>([]);
  const [isFirstSearch, setIsFirstSearch] = useState(true);
  const [itemModal, setItemModal] = useState<ItemModalProps>();
  const {
    isOpen: viewItemIsOpen,
    onOpen: viewItemOnOpen,
    onClose: viewItemOnClose,
  } = useDisclosure();
  const searchBar = useRef<HTMLInputElement>();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      },
      () => {
        setSearchMode('City');
      },
    );
  }, []);

  useEffect(() => {
    getProductsByLatLng();
  }, [location]);

  const getProductsByLatLng = async () => {
    if (location) {
      await productsNearbyLatLng(location);
      setSearchMode('LatLng');
    }
  };

  const productsNearbyLatLng = async (locationInfo: Location) => {
    try {
      const response = await api.get('product/list/nearby', {
        params: {
          type: 'product',
          latitude: locationInfo.lat,
          longitude: locationInfo.lng,
          radius: 10,
        },
      });
      console.log(response.data);
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  const searchProductsByCity = async (city: string, state: string) => {
    setIsLoadingCitySearch(true);
    try {
      const response = await api.get('product/list/nearby', {
        params: {
          type: 'product',
          city,
          state,
        },
      });
      setProducts(response.data);
      setFilteredProducts(response.data);
    } catch (e) {
      setProducts([]);
      setFilteredProducts([]);
    } finally {
      setIsLoadingCitySearch(false);
      setIsFirstSearch(false);
    }
  };

  const capitalize = (word: string) => {
    const lower = word.toLowerCase();
    return word.charAt(0).toUpperCase() + lower.slice(1);
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
  }: ItemModalProps) => {
    setItemModal({
      id,
      name,
      description,
      listPrice,
      salePrice,
      type,
      imageUrl,
      categoryName,
    });
    viewItemOnOpen();
  };

  return (
    <>
      <Flex minHeight="100vh" direction="column" bg="primary">
        <Flex id="Headers">
          <Flex
            display={{ base: 'flex', md: 'none' }}
            width="100%"
            bg="secondary"
          >
            <HeaderHalfCircleTop>
              <FormProductServiceSearch
                type="product"
                name="produto"
                items={products}
                setItems={setFilteredProducts}
                searchBar={searchBar as MutableRefObject<HTMLInputElement>}
              />
            </HeaderHalfCircleTop>
          </Flex>
          <Flex
            display={{ base: 'none', md: 'flex' }}
            width={{ base: '90%', lg: '80%' }}
            maxW={{ base: '100%', md: '1280' }}
            alignSelf="center"
            direction="column"
            margin="0px auto"
          >
            <DefaultHeader />
            <Flex align="center" direction="column" paddingBottom="40px">
              <FormProductServiceSearch
                type="product"
                name="produto"
                items={products}
                setItems={setFilteredProducts}
                searchBar={searchBar as MutableRefObject<HTMLInputElement>}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex
          bg="secondary"
          height="100%"
          flex="1"
          borderTopRadius={{ base: '0px', md: '105px' }}
          paddingBottom={{ base: '80px', md: '0px' }}
        >
          <Flex
            display={searchMode === 'Loading' ? 'flex' : 'none'}
            align="center"
            justify="center"
            width="100%"
          >
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="default_white"
              size="xl"
            />
          </Flex>
          <Flex
            display={searchMode === 'LatLng' ? 'flex' : 'none'}
            align="center"
            direction="column"
            width="100%"
            marginTop="40px"
          >
            <Text
              fontSize={{ base: '16px', md: '20px' }}
              fontWeight="medium"
              marginBottom="20px"
            >
              {capitalize(type)}s encontrados próximos a você:
            </Text>
            <Flex align="center">
              <Grid
                width="100%"
                templateColumns={{
                  base: 'repeat(1, 1fr)',
                  lg: 'repeat(2, 1fr)',
                }}
                marginBottom="40px"
                gap={10}
              >
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, key) => (
                    <GridItem colSpan={1} key={key}>
                      <ListProductServiceCard
                        key={key}
                        name={product.name}
                        img={product.imageUrl}
                        description={product.description}
                        listPrice={product.listPrice}
                        salePrice={product.salePrice}
                        businessId={product.business.id}
                        businessName={product.business.name}
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
                      />
                    </GridItem>
                  ))
                ) : (
                  <GridItem colSpan={{ base: 1, lg: 2 }} key="0 products">
                    <NoItemsText
                      color="primary"
                      text="Nenhum produto encontrado"
                    />
                  </GridItem>
                )}
              </Grid>
            </Flex>
          </Flex>
          <Flex
            display={searchMode === 'City' ? 'flex' : 'none'}
            align="center"
            direction="column"
            width="100%"
            marginTop="40px"
          >
            <FormCitySelect
              cityOptions={cities}
              search={searchProductsByCity}
              searchBar={searchBar as MutableRefObject<HTMLInputElement>}
            />
            <Flex direction="column">
              {!isLoadingCitySearch ? (
                <>
                  <Grid
                    width="100%"
                    templateColumns={{
                      base: 'repeat(1, 1fr)',
                      lg: 'repeat(2, 1fr)',
                    }}
                    marginBottom="40px"
                    gap={10}
                  >
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product, key) => (
                        <GridItem colSpan={1} key={key}>
                          <ListProductServiceCard
                            key={key}
                            name={product.name}
                            img={product.imageUrl}
                            description={product.description}
                            listPrice={product.listPrice}
                            salePrice={product.salePrice}
                            businessId={product.business.id}
                            businessName={product.business.name}
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
                          />
                        </GridItem>
                      ))
                    ) : (
                      <GridItem colSpan={{ base: 1, lg: 2 }} key="0 products">
                        <Text
                          textAlign="center"
                          margin="0px auto"
                          width={{ base: '80%', sm: '100%' }}
                          fontSize={{ base: '16px', md: '20px' }}
                          fontWeight="medium"
                        >
                          {isFirstSearch
                            ? `Pesquise os ${type}s próximos, selecionando sua cidade`
                            : `Nenhum ${type} encontrado na cidade`}
                        </Text>
                      </GridItem>
                    )}
                  </Grid>
                </>
              ) : (
                <Spinner
                  thickness="4px"
                  speed="0.65s"
                  emptyColor="gray.200"
                  color="default_white"
                  size="xl"
                />
              )}
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ProductServiceListModal
        name={itemModal?.name as string}
        description={itemModal?.description as string}
        type={itemModal?.type === 'product' ? 'Produto' : ('Serviço' as string)}
        grossPrice={itemModal?.listPrice as number}
        netPrice={itemModal?.salePrice as number}
        imageUrl={itemModal?.imageUrl as string}
        categoryName={itemModal?.categoryName as string}
        isOpen={viewItemIsOpen}
        onClose={viewItemOnClose}
      />
      <FooterMenu />
    </>
  );
};

const getAllCitiesWithBusiness = async () => {
  try {
    const response = await api.get('business/cities', {});
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const cities = await getAllCitiesWithBusiness();

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session, cities },
  };
};

export default ProductList;
