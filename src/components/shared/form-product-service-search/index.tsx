import {
  Button,
  Flex,
  FormControl,
  Input,
  Select,
  Stack,
  Text,
} from '@chakra-ui/react';
import { MutableRefObject } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { InputType } from 'zlib';
import FormErrorMessage from '../form-error-message';

type FormProductServiceSearchProps = {
  type: 'product' | 'service';
  name: 'produto' | 'serviço';
  items: Items;
  setItems: (products: Items) => void;
  searchBar: MutableRefObject<HTMLInputElement>;
};

type FormProductServiceSearchData = {
  name: string;
};

type Items = {
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
  type: 'product' | 'service';
}[];

export const FormProductServiceSearch = ({
  type,
  name,
  items,
  setItems,
  searchBar,
}: FormProductServiceSearchProps) => {
  const methods = useForm<FormProductServiceSearchData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onChange: SubmitHandler<FormProductServiceSearchData> = async () => {
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
          <Text color="default_white" fontSize="18px" fontWeight="bold">
            {`Busque os ${name}s que deseja`}
          </Text>
          <Stack
            width={{
              base: '100%',
              sm: '355px',
              md: '405px',
              lg: '430px',
              xl: '530px',
            }}
            margin="0px auto"
            direction="row"
          >
            <Input
              placeholder={`Digite o nome do ${name}`}
              required={true}
              bg="default_white"
              borderRadius="15px"
              _hover={{ transform: 'scale(1.02)' }}
              ref={searchBar}
            />
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
