import { FormControl, Stack } from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { UserFormInput } from '../user-form-input';

export const UserRegisterForm = () => {
  return (
    <>
      <FormControl width="100%" maxWidth="275px" margin="20px auto">
        <UserFormInput
          id="name"
          field="Nome"
          type="text"
          placeholder="Digite o nome desejado"
        />
        <UserFormInput
          id="email"
          field="Email"
          type="email"
          placeholder="Digite o email desejado"
        />
        <UserFormInput
          id="password"
          field="Senha"
          type="password"
          placeholder="Digite sua senha"
        />
        <UserFormInput
          id="confirm_password"
          field="Confirmar Senha"
          type="password"
          placeholder="Confirme sua senha"
        />
        <Stack direction="row" justify="center" spacing={25} marginTop="30px">
          <DefaultButton
            bg="default_black"
            color="default_white"
            text="Cancelar"
          />
          <DefaultButton bg="primary" color="default_white" text="Enviar" />
        </Stack>
      </FormControl>
    </>
  );
};
