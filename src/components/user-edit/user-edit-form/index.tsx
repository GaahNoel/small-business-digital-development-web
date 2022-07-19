import {
  Box,
  Checkbox,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { MdOutlineLock } from 'react-icons/md';

import { FormProvider, useForm, SubmitHandler } from 'react-hook-form';
import { DefaultButton } from '../../shared/default-button';
import { useEffect, useState } from 'react';
import { api } from '../../../service/api';
import { useRouter } from 'next/router';

import { toast } from 'react-toastify';
import { UserInput } from '../../shared/user-input';
import { FiUser } from 'react-icons/fi';

type UserEditFormProps = {
  id?: string;
  token: string;
  name: string;
};

type UserEditFormData = {
  name: string;
  password: string;
  confirm_password: string;
  change_password: boolean;
};

type ValueProps = 'name';

export const UserEditForm = (props: UserEditFormProps) => {
  const [submitLoading, setSubmitLoading] = useState(false);
  const [changePassword, setChangepPassword] = useState(false);
  const methods = useForm<UserEditFormData>();
  const {
    handleSubmit,
    formState: { errors },
    setError,
    setValue,
    register,
  } = methods;

  useEffect(() => {
    Object.keys(props).forEach((value) => {
      setValue(value as ValueProps, props[value as ValueProps]);
    });
  }, []);

  const router = useRouter();

  const editUserInfo = async ({
    name,
    password,
    confirm_password,
    change_password,
  }: UserEditFormData) => {
    try {
      if (change_password) {
        if (password !== confirm_password) {
          setError('confirm_password', {
            message: 'Senhas não correspondem',
          });
          throw 'Senhas não correspondem';
        }
        const response = await api.put(
          `account/edit/${props.id}`,
          {
            name,
            password,
          },
          {
            headers: {
              'content-type': 'application/json',
              token: `${props.token}`,
            },
          },
        );
      } else {
        const response = await api.put(
          `account/edit/${props.id}`,
          {
            name,
          },
          {
            headers: {
              'content-type': 'application/json',
              token: `${props.token}`,
            },
          },
        );
      }
      toast.success('Informações alteradas com sucesso!');
      router.push('/');
    } catch (e: any) {
      console.log(e);
    }
  };

  const onCheckBoxChange = async () => {
    setChangepPassword(!changePassword);
  };

  const onSubmit: SubmitHandler<UserEditFormData> = async ({
    name,
    password,
    confirm_password,
    change_password,
  }) => {
    setSubmitLoading(true);
    await editUserInfo({ name, password, confirm_password, change_password });
    setSubmitLoading(false);
  };

  return (
    <>
      <FormProvider {...methods}>
        <FormControl as="form" onSubmit={handleSubmit(onSubmit)}>
          <Stack
            direction="column"
            spacing={3}
            maxWidth={{ base: '90vw', md: '50vw', lg: '40vw', xl: '40vw' }}
            margin="0px auto"
            border="2px #000"
            borderRadius="3xl"
            bg="default_white"
            boxShadow="-14px 15px 15px -8px rgba(0,0,0,0.35);"
            padding={{ base: '25px', md: '25px 50px' }}
          >
            <Flex
              width="100%"
              justify="center"
              align="center"
              textAlign="center"
            >
              <Text color="primary" fontSize="30px" fontWeight="bold">
                Altere as informações necessárias
              </Text>
            </Flex>

            <UserInput
              id="name"
              field="Nome"
              type="text"
              placeholder="Digite o nome desejado"
              icon={FiUser}
            />
            {changePassword && (
              <>
                <UserInput
                  id="password"
                  field="Senha"
                  type="password"
                  placeholder="Digite sua senha"
                  icon={MdOutlineLock}
                  required={false}
                />
                <UserInput
                  id="confirm_password"
                  field="Confirmar Senha"
                  type="password"
                  placeholder="Confirme sua senha"
                  icon={MdOutlineLock}
                  required={false}
                />
              </>
            )}

            <Checkbox
              {...register('change_password')}
              onChange={onCheckBoxChange}
              color="primary"
              colorScheme="purple"
              size="lg"
            >
              Alterar senha
            </Checkbox>
            <Stack
              direction="row"
              justify="center"
              spacing={25}
              marginTop="30px"
            >
              <DefaultButton
                bg="default_black"
                color="default_white"
                text="Sair"
                onClick={() => router.push('/')}
              />
              <DefaultButton
                bg="primary"
                color="default_white"
                text="Alterar"
                isLoading={submitLoading}
                type="submit"
              />
            </Stack>
          </Stack>
        </FormControl>
      </FormProvider>
    </>
  );
};
