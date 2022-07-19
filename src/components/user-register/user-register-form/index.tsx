import { FormControl, Stack } from '@chakra-ui/react';
import { DefaultButton } from '../../shared/default-button';
import { FormInput } from '../../shared/form-input';
import { FiUser } from 'react-icons/fi';
import { MdOutlineMail, MdOutlineLock } from 'react-icons/md';
import { api } from '../../../service/api';
import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import Router, { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import { UserInput } from '../../shared/user-input';
import { useRef, useState } from 'react';

type RegisterFormData = {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
};

export const UserRegisterForm = ({
  changeOption,
}: {
  changeOption: (param: 'Entrar' | 'Registrar') => void;
}) => {
  const methods = useForm<RegisterFormData>();
  const router = useRouter();
  const password = useRef({});
  const [submitLoading, setSubmitLoading] = useState(false);
  password.current = methods.watch('password', '');

  const {
    handleSubmit,
    formState: { errors },
    setError,
  } = methods;

  const onSubmit: SubmitHandler<RegisterFormData> = async ({
    name,
    email,
    password,
    confirm_password,
  }) => {
    try {
      setSubmitLoading(true);
      if (password !== confirm_password) {
        setError('confirm_password', {
          message: 'Senhas não correspondem',
        });
        throw 'Senhas não correspondem';
      }

      await api.post('signup', {
        name,
        email,
        password,
        provider: 'credentials',
      });
      toast.success('E-mail de validação enviado!');
      changeOption('Entrar');
      setSubmitLoading(false);
    } catch (e) {
      setSubmitLoading(false);
      console.log(e);
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
          <Stack justify="center" spacing={1}>
            <UserInput
              id="name"
              field="Nome"
              type="text"
              placeholder="Digite o nome desejado"
              icon={FiUser}
            />
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
              shouldCalcPasswordStrength={true}
            />
            <UserInput
              id="confirm_password"
              field="Confirmar Senha"
              type="password"
              placeholder="Confirme sua senha"
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
              text="Enviar"
              type="submit"
              isLoading={submitLoading}
            />
          </Stack>
        </FormControl>
      </FormProvider>
    </>
  );
};
