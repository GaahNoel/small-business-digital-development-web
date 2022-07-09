import { Flex, FormControl, Stack, Text } from '@chakra-ui/react';
import { Router, useRouter } from 'next/router';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useProductForm } from '../../../hooks/product-form';
import { DefaultButton } from '../../shared/default-button';
import { ItemFormSelect } from '../item-form-select';

type EstablishmentBaseProps = {
  id: string,
  name: string,
};

type ItemRegisterFormProps = {
  establishmentBase: EstablishmentBaseProps;
  categories: { id: string; name: string }[];
};

type RegisterItemFormData = {
  type: string;
  category: string;
};

export const ItemRegisterForm = ({establishmentBase, categories }: ItemRegisterFormProps) => {
  const methods = useForm<RegisterItemFormData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;
  const { setStage, form } = useProductForm();
  const {
    setType,
    setCategory,
  } = form;
  const establishmentOptions = [
    { id: establishmentBase.id, name: establishmentBase.name },
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
      <Flex direction="column" justify="center" align="center" margin="10px auto">
        <Text fontSize={{base: "1.5rem", md: "2.2rem", xl: "2.5rem"}} fontWeight="bold">
          Selecione a opção que deseja
        </Text>
        <FormControl
          as="form"
          width="100%"
          maxWidth={{base: "275px", md: "350px", xl: "500px"}}
          margin="10px auto"
          border="2px #000"
          borderRadius="3xl"
          bg="default_white"
          boxShadow="-14px 15px 15px -8px rgba(0,0,0,0.35);"
          padding={{base: "25px", md:"50px", xl: "70px"}}
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
              onClick={() => router.push(`/establishment/${establishmentBase.id}`)}
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
