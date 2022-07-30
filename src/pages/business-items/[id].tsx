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
  Image,
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
import { AccordionPanelItems } from '../../components/business-items/accordion-panel-items';
import { AccordionButtonItems } from '../../components/shared/accordion-button-items';
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
  maxPermittedCouponPercentage: number;
};

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
  const couponArray = [
    { color: empty_gray, value: 0 },
    { color: default_yellow, value: 5 },
    { color: default_orange, value: 7 },
    { color: service_blue, value: 10 },
  ];

  useEffect(() => {
    setFilteredItems(items);
  }, []);

  const getCouponColor = () => {
    const couponIndex = couponArray.findIndex((coupon) => {
      return coupon.value === business.maxPermittedCouponPercentage;
    });
    return couponArray[couponIndex].color;
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
              maxW={{ base: '300px', md: '600px' }}
              align="center"
              justify="center"
              color="default_white"
              spacing={1}
            >
              <Image
                src={business.imageUrl}
                fallbackSrc="/imgLoader.gif"
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
            <Flex
              id="coupon"
              align="center"
              direction="column"
              paddingBottom="40px"
            >
              <Stack direction="column" align="center" spacing={3}>
                <Text
                  fontSize={{
                    base: '18px',
                    sm: '22px',
                    md: '26px',
                    lg: '30px',
                    '2xl': '34px',
                  }}
                  fontWeight="bold"
                  color="primary"
                >
                  {`Cupons disponíveis`}
                </Text>
                {business.maxPermittedCouponPercentage > 0 ? (
                  <Flex>
                    <CouponInfo
                      iconColor={couponArray[1].color}
                      text={`${couponArray[1].value}%`}
                      value={couponArray[1].value}
                      maxPermittedCouponPercentage={
                        business.maxPermittedCouponPercentage
                      }
                    />
                    <CouponInfo
                      iconColor={couponArray[2].color}
                      text={`${couponArray[2].value}%`}
                      value={couponArray[2].value}
                      maxPermittedCouponPercentage={
                        business.maxPermittedCouponPercentage
                      }
                    />
                    <CouponInfo
                      iconColor={couponArray[3].color}
                      text={`${couponArray[3].value}%`}
                      value={couponArray[3].value}
                      maxPermittedCouponPercentage={
                        business.maxPermittedCouponPercentage
                      }
                    />
                  </Flex>
                ) : (
                  <Text
                    fontSize={{
                      base: '14px',
                      sm: '18px',
                      md: '20px',
                      lg: '24px',
                    }}
                    fontWeight="medium"
                    color="primary"
                  >
                    {`O estabelecimento não disponibiliza o uso de cupons`}
                  </Text>
                )}
              </Stack>
            </Flex>

            <Flex align="center" direction="column" paddingBottom="40px">
              <InputSearchItems
                items={items}
                setItems={setFilteredItems}
                searchBar={searchBar as MutableRefObject<HTMLInputElement>}
              />
            </Flex>
            <Flex align="center" display="flex" direction="column" width="100%">
              <Accordion
                gridGap={10}
                allowMultiple
                marginBottom="60px"
                width={{ base: '90%', lg: '80%' }}
                maxW={{ base: '100%', md: '1280px' }}
              >
                <AccordionItem bg="default_orange" borderRadius="15px">
                  <AccordionButtonItems icon={FiPackage} type_name="Produtos" />
                  <AccordionPanelItems
                    filteredItems={filteredItems}
                    business={business}
                    type="product"
                    type_name="produto"
                    bgColor="default_orange_light"
                    openModal={openModal}
                  />
                </AccordionItem>
                <AccordionItem
                  bg="service_blue"
                  borderRadius="15px"
                  marginTop="20px"
                >
                  <AccordionButtonItems icon={FiTool} type_name="Serviços" />
                  <AccordionPanelItems
                    filteredItems={filteredItems}
                    business={business}
                    type="service"
                    type_name="serviço"
                    bgColor="service_blue_light"
                    openModal={openModal}
                  />
                </AccordionItem>
              </Accordion>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
      <ProductServiceListModal
        id={itemModal?.id as string}
        name={itemModal?.name as string}
        description={itemModal?.description as string}
        type={itemModal?.type as 'product' | 'service'}
        typeName={
          itemModal?.type === 'product' ? 'Produto' : ('Serviço' as string)
        }
        grossPrice={itemModal?.listPrice as number}
        netPrice={itemModal?.salePrice as number}
        imageUrl={itemModal?.imageUrl as string}
        categoryName={itemModal?.categoryName as string}
        businessId={business.id as string}
        isOpen={viewItemIsOpen}
        onClose={viewItemOnClose}
        inBusinessPage={true}
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
