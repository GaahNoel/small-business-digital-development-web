import { Flex, FormControl, Stack, Text } from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { ItemFormSelect } from '../item-form-select';

export const ItemRegisterForm = () => {
  return (
    <>
      <Flex direction="column" align="center" margin="20px 0px">
        <Text fontSize="1.5rem" fontWeight="bold">
          Selecione a opção que deseja
        </Text>
        <FormControl width="100%" maxWidth="275px" margin="20px auto">
          <Stack spacing={4}>
            <ItemFormSelect
              id="Estabelecimento"
              disabled={true}
              text="Estabelecimento"
            />
            <ItemFormSelect id="Tipo" disabled={false} text="Tipo" />
            <ItemFormSelect id="Categoria" disabled={false} text="Categoria" />
          </Stack>
          <Stack direction="row" justify="center" spacing={25} marginTop="30px">
            <DefaultButton
              bg="default_black"
              color="default_white"
              text="Cancelar"
            />
            <DefaultButton bg="primary" color="default_white" text="Avançar" />
          </Stack>
        </FormControl>
      </Flex>
    </>
  );
};
