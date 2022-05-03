import { FormControl, Stack } from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { FormInput } from '../../shared/form-input';
import { MdOutlineMail, MdOutlineLock } from 'react-icons/md';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useSession, signIn } from 'next-auth/react';

type LoginFormData = {
  email: string;
  password: string;
};

export const UserLoginForm = () => {
  const methods = useForm<LoginFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const login = () => {
    signIn('credentials', { username: 'pato', password: '1234' });
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormControl width="100%" maxWidth="275px" margin="5px auto">
          <Stack justify="center" spacing={2}>
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
          </Stack>
          <Stack direction="row" justify="center" spacing={25} marginTop="20px">
            <DefaultButton
              bg="default_black"
              color="default_white"
              text="Cancelar"
            />
            <DefaultButton
              bg="primary"
              color="default_white"
              text="Entrar"
              type="submit"
              onClick={login}
            />
          </Stack>
        </FormControl>
      </FormProvider>
    </>
  );
};
