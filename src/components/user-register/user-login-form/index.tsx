import { FormControl, Stack } from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { FormInput } from '../../shared/form-input';
import { MdOutlineMail, MdOutlineLock } from 'react-icons/md';
import { api } from '../../../service/api';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { UserInput } from '../../shared/user-input';
import { useState } from 'react';
import { EmailVerification, InvalidFieldError } from '../../../errors';
import axios from 'axios';

type LoginFormData = {
  email: string;
  password: string;
};

export const UserLoginForm = () => {
  const methods = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const { data } = useSession();
  const router = useRouter();

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit: SubmitHandler<LoginFormData> = async ({
    email,
    password,
  }) => {
    setIsLoading(true);
    try {
      const response = await api.post('account/check-password', {
        email,
        password,
      });

      const { id, match, verified } = response.data;
      if (match && verified) {
        await signIn('credentials', {
          redirect: false,
          id: id,
          email: email,
          password: password,
        }),
          toast.success('Login realizado com sucesso!');

        setIsLoading(false);
        router.push('/');
      }

      if (!match) {
        throw new InvalidFieldError('password');
      }

      if (!verified) {
        throw new EmailVerification();
      }
    } catch (error) {
      setIsLoading(false);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 404) {
          toast.error('Conta não encontrada! Verifique o email digitado');
          setError('email', {
            message: 'Endereço de email inválido',
          });

          return;
        }
      }

      if (error instanceof InvalidFieldError) {
        toast.error('Email ou senha incorretos!');
        setError(error.field, { message: 'Campo incorreto' });
        return;
      }

      if (error instanceof EmailVerification) {
        toast.error(error.message);
        setError('email', { message: 'Email não verificado' });
        return;
      }

      toast.error('Ocorreu um erro, tente novamente!');
      setError('email', {});
      setError('password', {});
    }
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormControl
          as="form"
          width="100%"
          maxWidth="275px"
          margin="5px auto"
          onSubmit={handleSubmit(onSubmit)}
          transition="all 0.2s"
        >
          <Stack justify="center" spacing={2}>
            <UserInput
              id="email"
              field="Email"
              type="email"
              placeholder="Digite o email desejado"
              icon={MdOutlineMail}
            />
            <UserInput
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
              onClick={() => router.push('/login')}
            />
            <DefaultButton
              bg="primary"
              color="default_white"
              text="Entrar"
              type="submit"
              isLoading={isLoading}
            />
          </Stack>
        </FormControl>
      </FormProvider>
    </>
  );
};
