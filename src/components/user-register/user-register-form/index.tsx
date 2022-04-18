import { FormControl, Stack } from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { FormInput } from '../../shared/form-input';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMail, MdOutlineLock } from 'react-icons/md';

export const UserRegisterForm = () => {
  return (
    <>
      <FormControl width="100%" maxWidth="275px" margin="5px auto">
        <Stack justify="center" spacing={2}>
          <FormInput
            id="name"
            field="Nome"
            type="text"
            placeholder="Digite o nome desejado"
            icon={FiUser}
          />
          <FormInput
            id="email"
            field="Email"
            type="email"
            placeholder="Digite o email desejado"
            icon={MdOutlineMail}
          />
          <FormInput
            id="password"
            field="Senha"
            type="password"
            placeholder="Digite sua senha"
            icon={MdOutlineLock}
          />
          <FormInput
            id="confirm_password"
            field="Confirmar Senha"
            type="password"
            placeholder="Confirme sua senha"
            icon={MdOutlineLock}
          />
        </Stack>
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
