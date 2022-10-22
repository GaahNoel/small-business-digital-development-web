import {
  AccordionPanel,
  Button,
  Flex,
  FormControl,
  Grid,
  GridItem,
  Icon,
  Input,
  InputGroup,
  InputLeftAddon,
  InputLeftElement,
  InputRightElement,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FiSearch } from 'react-icons/fi';
import { InputType } from 'zlib';
import FormErrorMessage from '../../shared/form-error-message';
import { ListProductServiceCard } from '../../shared/list-product-service-card';
import { NoItemsText } from '../../shared/no-items-text';

type AccordionPanelItemsProps = {
  filteredItems: Items;
  business: Business;
  type: 'product' | 'service';
  type_name: string;
  bgColor: string;
  openModal: (params: {
    id: string;
    name: string;
    description: string;
    listPrice: number;
    salePrice: number;
    type: string;
    categoryName: string;
    imageUrl: string;
  }) => void;
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

export const AccordionPanelItems = ({
  filteredItems,
  business,
  type,
  type_name,
  bgColor,
  openModal,
}: AccordionPanelItemsProps) => {
  return (
    <>
      <AccordionPanel bg={bgColor}>
        <Flex id={type} margin="40px 0px" align="center" justify="center">
          <Grid
            width="100%"
            templateColumns={{
              base: 'repeat(1, 1fr)',
              xl: 'repeat(2, 1fr)',
            }}
            gap={10}
          >
            {filteredItems.some((item) => {
              if (item.type === type) return true;
            }) ? (
              filteredItems.map((item, key) => {
                if (item.type === type)
                  return (
                    <GridItem colSpan={1} key={`${type}-${key}`}>
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
                              categoryName: item.category?.name as string,
                              imageUrl: item.imageUrl,
                            });
                          }}
                        />
                      </Flex>
                    </GridItem>
                  );
              })
            ) : (
              <GridItem colSpan={{ base: 1, lg: 2 }}>
                <NoItemsText
                  color="default_white"
                  text={`Nenhum ${type_name} encontrado`}
                />
              </GridItem>
            )}
          </Grid>
        </Flex>
      </AccordionPanel>
    </>
  );
};
