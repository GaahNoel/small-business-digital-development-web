import {
  Button,
  Flex,
  FormControl,
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

type InputSearchStatusOrderProps = {
  buyOrders: OrderByBusiness;
  setBuyOrdersFiltered: (order: OrderByBusiness) => void;
  sellOrders: OrderByBusiness;
  setSellOrdersFiltered: (order: OrderByBusiness) => void;
  disabled: boolean;
  searchBar: MutableRefObject<HTMLSelectElement>;
};

type InputSearchStatusOrderData = {
  status: string;
};

type OrderByBusiness = {
  business: Business;
  orders: Order;
}[];

type Business = {
  id: string;
  name: string;
};

type Order = {
  id: string;
  status: 'CANCELED' | 'PENDING' | 'COMPLETED';
  total: number;
  items: Item[];
  createdAt: string;
  updatedAt: string;
  buyerId: string;
  sellerId: string;
}[];

type Item = {
  id: string;
  quantity: number;
  product: {
    id: string;
    name: string;
    description: string;
    salePrice: number;
    listPrice: number;
    imageUrl: string;
  };
};

export const InputSearchStatusOrder = ({
  buyOrders,
  setBuyOrdersFiltered,
  sellOrders,
  setSellOrdersFiltered,
  disabled,
  searchBar,
}: InputSearchStatusOrderProps) => {
  const methods = useForm<InputSearchStatusOrderData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onChange: SubmitHandler<InputSearchStatusOrderData> = async () => {
    const status = searchBar.current.value;
    if (status !== 'ALL') {
      const buyOrdersFilteredArray: OrderByBusiness = [];
      const sellOrdersFilteredArray: OrderByBusiness = [];

      buyOrders.forEach((buyOrder) => {
        const filtered = {
          ...buyOrder,
          orders: buyOrder.orders.filter((order) => {
            if (order.status === status) return true;
          }),
        };

        if (filtered.orders.length > 0) buyOrdersFilteredArray.push(filtered);
      });
      sellOrders.forEach((sellOrder) => {
        const filtered = {
          ...sellOrder,
          orders: sellOrder.orders.filter((order) => {
            if (order.status === status) return true;
          }),
        };

        if (filtered.orders.length > 0) sellOrdersFilteredArray.push(filtered);
      });
      setBuyOrdersFiltered(buyOrdersFilteredArray);
      setSellOrdersFiltered(sellOrdersFilteredArray);
    } else {
      setBuyOrdersFiltered(buyOrders);
      setSellOrdersFiltered(sellOrders);
    }
  };

  return (
    <>
      <FormControl as="form" onChange={handleSubmit(onChange)}>
        <Stack direction="column" align="center" justify="center" spacing={3}>
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
            {`Busque os itens que deseja`}
          </Text>
          <Stack
            width={{
              base: '100%',
              sm: '355px',
              md: '405px',
              lg: '430px',
              xl: '700px',
            }}
            margin="0px auto"
            direction="row"
          >
            <Select
              _hover={{ transform: 'scale(1.02)' }}
              bg="default_white"
              borderRadius="15px"
              fontSize={{
                base: '14px',
                sm: '16px',
                md: '20px',
                lg: '24px',
                '2xl': '28px',
              }}
              height={{ base: '55px', sm: '60px', md: '70px' }}
              color="primary"
              transition={'all 0.2s ease-in-out'}
              disabled={disabled}
              ref={searchBar}
            >
              <option value="ALL">Todos</option>
              <option value="COMPLETED">Finalizado</option>
              <option value="PENDING">Pendente</option>
              <option value="CANCELED">Cancelado</option>
            </Select>
          </Stack>
        </Stack>
      </FormControl>
    </>
  );
};
