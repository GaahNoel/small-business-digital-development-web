import { Button, Flex, FormControl, Input, Select, Stack, Text } from "@chakra-ui/react";
import { SubmitHandler, useForm } from "react-hook-form";
import FormErrorMessage from "../form-error-message";

type FormProductServiceSearchProps = {
    type: 'product' | 'service';
    name: 'produto' | 'serviço';
}

type FormProductServiceSearchData = {
    name: string;
}

export const FormProductServiceSearch = ({type, name}: FormProductServiceSearchProps) => {
  const methods = useForm<FormProductServiceSearchData>();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FormProductServiceSearchData> = async ({
    name
    }) => {
        console.log(name)
    };

  return (
    <>
        <FormControl as="form" onChange={handleSubmit(onSubmit)}>
            <Stack direction="column" align="center" justify="center" spacing={3}>
                <Text color="default_white" fontSize="18px" fontWeight="bold">
                    {`Busque os ${name}s que deseja`}
                </Text>
                <Stack width={{base: "100%", sm: "355px", md: "405px", lg: "430px", xl: "530px"}} margin="0px auto" direction="row"> 
                    <Input {...register('name')} placeholder={`Digite o nome do ${name} desejado`} required={true} bg="default_white" borderRadius="15px" />
                </Stack>
            </Stack>
        </FormControl>
        {errors['name'] && errors['name'].type === "required" && <FormErrorMessage message="Campo necessário" />}
        {errors['name'] && errors['name'].type === "maxLength" && <FormErrorMessage message="Máximo de caracteres ultrapassado" /> }
    </>
  );
};
