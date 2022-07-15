import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Heading,
  Icon,
  IconButton,
  Img,
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
import { FiPackage, FiSearch, FiTool } from 'react-icons/fi';
import { FormProductServiceSearch } from '../../components/shared/form-product-service-search';
import { FooterMenu } from '../../components/shared/footer-menu';
import { DefaultHeader } from '../../components/shared/default-header';
import { ProductServiceListModal } from '../../components/shared/product-service-list-modal';
import { InputType } from 'zlib';
import { InputSearchItems } from '../../components/business-items/input-search-items';

type ParamsProps = {
  id: string;
};

type BusinessItemsProps = {
  items: Items;
  business: Business;
};

type Items = {
  id: string;
  name: string;
  type: string;
  description: string;
  listPrice: number;
  salePrice: number;
  imageUrl: string;
  businessId: string;
  category: { id: string; name: string };
}[];

type Business = {
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

const BusinessItems = ({ items, business }: BusinessItemsProps) => {
  const router = useRouter();
  const [filteredItems, setFilteredItems] = useState<Items>([]);
  const [itemModal, setItemModal] = useState<ItemModalProps>();
  const {
    isOpen: viewItemIsOpen,
    onOpen: viewItemOnOpen,
    onClose: viewItemOnClose,
  } = useDisclosure();
  const searchBar = useRef<HTMLInputElement>();

  useEffect(() => {
    setFilteredItems(items);
    console.log(items);
  }, []);

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
            width={{ base: '90%', lg: '80%' }}
            maxW={{ base: '100%', md: '1280px' }}
            alignSelf="center"
            direction="column"
            margin="0px auto"
          >
            <DefaultHeader />
            <Stack
              margin="20px auto 50px auto"
              width="100%"
              maxW={{ base: '500px', md: '600px' }}
              align="center"
              justify="center"
              color="default_white"
              spacing={1}
            >
              <Img
                src={business.imageUrl}
                width={{ base: '120px', md: '200px', lg: '240px' }}
                height={{ base: '120px', md: '200px', lg: '240px' }}
                objectFit="cover"
                borderRadius="full"
              />
              <Flex direction="column" width="100%" align="start">
                <Flex maxWidth="1000px" wordBreak="break-all">
                  <Heading
                    as="h3"
                    fontSize={{
                      base: '20px',
                      sm: '30px',
                      md: '40px',
                      lg: '45px',
                      '2xl': '50px',
                    }}
                  >
                    {business.name}
                  </Heading>
                </Flex>
                <Flex
                  direction="column"
                  width="100%"
                  fontSize={{
                    base: '15px',
                    md: '18px',
                    lg: '20px',
                    '2xl': '22px',
                  }}
                >
                  <Text>Estado: {business.state}</Text>
                  <Text>Cidade: {business.city}</Text>
                  {business.street && (
                    <Text>Localização: {business.street}</Text>
                  )}
                </Flex>
              </Flex>
            </Stack>
          </Flex>
        </Flex>
        <Flex
          bg="secondary"
          height="100%"
          flex="1"
          borderTopRadius="105px"
          paddingBottom={{ base: '80px', md: '0px' }}
        >
          <Flex align="center" direction="column" width="100%" marginTop="40px">
            <Flex align="center" direction="column" paddingBottom="40px">
              <InputSearchItems
                items={items}
                setItems={setFilteredItems}
                searchBar={searchBar as MutableRefObject<HTMLInputElement>}
              />
            </Flex>
            <Flex align="center" display="flex" direction="column" width="100%">
              {filteredItems.length > 0 ? (
                <>
                  <Accordion
                    gridGap={10}
                    allowMultiple
                    marginBottom="60px"
                    width={{ base: '90%', lg: '80%' }}
                    maxW={{ base: '100%', md: '1280px' }}
                  >
                    <AccordionItem bg="default_orange" borderRadius="15px">
                      <AccordionButton
                        fontSize={{
                          base: '14px',
                          sm: '18px',
                          md: '22px',
                          lg: '26px',
                          '2xl': '30px',
                        }}
                        fontWeight="medium"
                        color="default_white"
                        gap={2}
                        _hover={{
                          svg: {
                            animation: 'drawIcons 3s ease 1',
                            animationFillMode: 'backwards',
                          },
                          '@keyframes drawIcons': {
                            '0%': { strokeWidth: 0, strokeDasharray: '1 100' },
                            '100%': {
                              strokeWidth: 1.5,
                              strokeDasharray: '100 0',
                            },
                          },
                        }}
                      >
                        <Icon
                          as={FiPackage}
                          fontSize={{
                            base: '18px',
                            sm: '22px',
                            md: '26px',
                            lg: '30px',
                            '2xl': '36px',
                          }}
                          color="default_white"
                          strokeWidth="1.5"
                        />
                        <Box flex="1" textAlign="left">
                          Produtos
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel bg="default_orange_light">
                        <Flex
                          id="products"
                          margin="40px 0px"
                          align="center"
                          justify="center"
                        >
                          <Grid
                            width="100%"
                            templateColumns={{
                              base: 'repeat(1, 1fr)',
                              lg: 'repeat(2, 1fr)',
                            }}
                            gap={10}
                          >
                            {filteredItems.map((item, key) => {
                              if (item.type === 'product')
                                return (
                                  <GridItem colSpan={1} key={key}>
                                    <Flex align="center" justify="center">
                                      <ListProductServiceCard
                                        key={key}
                                        name={item.name}
                                        img={item.imageUrl}
                                        description={item.description}
                                        listPrice={item.listPrice}
                                        salePrice={item.salePrice}
                                        businessId={business.id}
                                        businessName={business.name}
                                        detailClick={() => {
                                          openModal({
                                            id: item.id,
                                            name: item.name,
                                            description: item.description,
                                            listPrice: item.listPrice,
                                            salePrice: item.salePrice,
                                            type: item?.type as string,
                                            categoryName: item.category
                                              ?.name as string,
                                            imageUrl: item.imageUrl,
                                          });
                                        }}
                                      />
                                    </Flex>
                                  </GridItem>
                                );
                            })}
                          </Grid>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                    <AccordionItem
                      bg="service_blue"
                      borderRadius="15px"
                      marginTop="20px"
                    >
                      <AccordionButton
                        fontSize={{
                          base: '14px',
                          sm: '18px',
                          md: '22px',
                          lg: '26px',
                          '2xl': '30px',
                        }}
                        fontWeight="medium"
                        color="default_white"
                        gap={2}
                        _hover={{
                          svg: {
                            animation: 'drawIcons 3s ease 1',
                            animationFillMode: 'backwards',
                          },
                          '@keyframes drawIcons': {
                            '0%': { strokeWidth: 0, strokeDasharray: '1 100' },
                            '100%': {
                              strokeWidth: 1.5,
                              strokeDasharray: '100 0',
                            },
                          },
                        }}
                      >
                        <Icon
                          as={FiTool}
                          fontSize={{
                            base: '18px',
                            sm: '22px',
                            md: '26px',
                            lg: '30px',
                            '2xl': '36px',
                          }}
                          color="default_white"
                          strokeWidth="1.5"
                        />
                        <Box flex="1" textAlign="left">
                          Serviços
                        </Box>
                        <AccordionIcon />
                      </AccordionButton>
                      <AccordionPanel bg="service_blue_light">
                        <Flex id="services" margin="40px 0px">
                          <Grid
                            width="100%"
                            templateColumns={{
                              base: 'repeat(1, 1fr)',
                              lg: 'repeat(2, 1fr)',
                            }}
                            gap={10}
                          >
                            {filteredItems.map((item, key) => {
                              if (item.type === 'service')
                                return (
                                  <GridItem colSpan={1} key={key}>
                                    <Flex align="center" justify="center">
                                      <ListProductServiceCard
                                        key={key}
                                        name={item.name}
                                        img={item.imageUrl}
                                        description={item.description}
                                        listPrice={item.listPrice}
                                        salePrice={item.salePrice}
                                        businessId={business.id}
                                        businessName={business.name}
                                        detailClick={() => {
                                          openModal({
                                            id: item.id,
                                            name: item.name,
                                            description: item.description,
                                            listPrice: item.listPrice,
                                            salePrice: item.salePrice,
                                            type: item?.type as string,
                                            categoryName: item.category
                                              ?.name as string,
                                            imageUrl: item.imageUrl,
                                          });
                                        }}
                                      />
                                    </Flex>
                                  </GridItem>
                                );
                            })}
                          </Grid>
                        </Flex>
                      </AccordionPanel>
                    </AccordionItem>
                  </Accordion>
                </>
              ) : (
                <Flex key="0 items" align="start">
                  <NoItemsText color="primary" text="Nenhum item encontrado" />
                </Flex>
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
        inBusinessPage={true}
        isOpen={viewItemIsOpen}
        onClose={viewItemOnClose}
      />
      <FooterMenu />
    </>
  );
};

const getBusinessInfo = async (businessId: string) => {
  try {
    const response = await api.get(`business/${businessId}`, {});
    console.log(response.data);
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

const getAllItems = async (businessId: string) => {
  try {
    const response = await api.get(`product/list/${businessId}`, {});
    return response.data;
  } catch (e) {
    console.log(e);
  }
};

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getToken({
    req,
    raw: true,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { id } = params as ParamsProps;
  const business = await getBusinessInfo(id);
  const items = await getAllItems(id);

  if (!session) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { session, items, business },
  };
};

export default BusinessItems;
