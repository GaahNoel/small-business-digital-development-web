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

type InputSearchItemsProps = {
  items: Items;
  setItems: (products: Items) => void;
  searchBar: MutableRefObject<HTMLInputElement>;
};

type InputSearchItemsData = {
  name: string;
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

export const InputSearchItems = ({
  items,
  setItems,
  searchBar,
}: InputSearchItemsProps) => {
  const methods = useForm<InputSearchItemsData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onChange: SubmitHandler<InputSearchItemsData> = async () => {
    const name = searchBar.current.value;
    const itemsFiltered = items.filter((item) => {
      if (item.name.toUpperCase().includes(name.toUpperCase())) return item;
    });
    setItems(itemsFiltered);
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
            <InputGroup>
              <InputLeftElement
                children={<Icon as={FiSearch} color="primary" />}
                pointerEvents="none"
                fontSize={{
                  base: '14px',
                  sm: '16px',
                  md: '20px',
                  lg: '24px',
                  '2xl': '28px',
                }}
                height={{ base: '55px', sm: '60px', md: '70px' }}
              />
              <Input
                placeholder="Digite o nome do item"
                required={true}
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
                ref={searchBar}
              />
            </InputGroup>
          </Stack>
        </Stack>
      </FormControl>
      {errors['name'] && errors['name'].type === 'required' && (
        <FormErrorMessage message="Campo necessário" />
      )}
      {errors['name'] && errors['name'].type === 'maxLength' && (
        <FormErrorMessage message="Máximo de caracteres ultrapassado" />
      )}
    </>
  );
};
