import { FormControl, Stack } from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { FormInput } from '../../shared/form-input';
import { MdOutlineMail, MdOutlineLock } from 'react-icons/md';
import { api } from '../../../service/api';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { useSession, signIn } from 'next-auth/react';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { UserInput } from '../user-input';

type LoginFormData = {
  email: string;
  password: string;
};

export const UserLoginForm = () => {
  const methods = useForm<LoginFormData>();
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
        router.push('/');
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
              onClick={()=>router.push("/login")}
            />
            <DefaultButton
              bg="primary"
              color="default_white"
              text="Entrar"
              type="submit"
            />
          </Stack>
        </FormControl>
      </FormProvider>
    </>
  );
};
