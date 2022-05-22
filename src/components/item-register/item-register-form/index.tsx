import { Flex, FormControl, Stack, Text } from '@chakra-ui/react';
import { Router, useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useProductForm } from '../../../hooks/product-form';
import { DefaultButton } from '../../shared/default-button';
import { ItemFormSelect } from '../item-form-select';

type ItemRegisterFormProps = {
  categories: string[];
};

type RegisterItemFormData = {
  type: string;
  category: string;
};

export const ItemRegisterForm = ({ categories }: ItemRegisterFormProps) => {
  const methods = useForm<RegisterItemFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;
  const { setStage, form } = useProductForm();
  const {
    establishmentId,
    establishmentName,
    type,
    setType,
    category,
    setCategory,
  } = form;
  const establishmentOptions = [
    { id: establishmentId, name: establishmentName },
  ];
  const typeOptions = [
    { id: '1', name: 'Produto' },
    { id: '2', name: 'Serviço' },
  ];
  const categoryOptions = categories;
  const router = useRouter();

  const onSubmit: SubmitHandler<RegisterItemFormData> = async ({
    type,
    category,
  }) => {
    setType(type === '1' ? 'product' : 'service');
    setCategory(category);
    setStage('secondary');
  };

  return (
    <>
      <Flex direction="column" align="center" margin="20px 0px">
        <Text fontSize="1.5rem" fontWeight="bold">
          Selecione a opção que deseja
        </Text>
        <FormControl
          as="form"
          width="100%"
          maxWidth="275px"
          margin="20px auto"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Stack spacing={4}>
            <ItemFormSelect
              id="establishment"
              disabled={true}
              text="Estabelecimento"
              options={establishmentOptions}
              register={register}
            />
            <ItemFormSelect
              id="type"
              disabled={false}
              text="Tipo"
              options={typeOptions}
              register={register}
            />
            <ItemFormSelect
              id="category"
              disabled={false}
              text="Categoria"
              options={categoryOptions}
              register={register}
            />
          </Stack>
          <Stack direction="row" justify="center" spacing={25} marginTop="30px">
            <DefaultButton
              bg="default_black"
              color="default_white"
              text="Cancelar"
              onClick={() => router.push('/')}
            />
            <DefaultButton
              bg="primary"
              color="default_white"
              text="Avançar"
              type="submit"
            />
          </Stack>
        </FormControl>
      </Flex>
    </>
  );
};
