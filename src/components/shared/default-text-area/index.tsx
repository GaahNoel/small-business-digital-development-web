import { Flex, FormLabel, Textarea } from '@chakra-ui/react';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from '../form-error-message';

type DefaultTextAreaProps = {
  id: string;
  text: string;
  placeholder: string;
  register?: any;
  required?: boolean;
  maxLength?: number;
};

export const DefaultTextArea = ({
  id,
  text,
  placeholder,
  register,
  required=true,
  maxLength=40,
}: DefaultTextAreaProps) => {
  const { formState: { errors } } = useFormContext();
  return (
    <>
      <Flex direction="column" marginBottom="10px">
        <FormLabel
          htmlFor={`descricao_label`}
          color="primary"
          fontWeight="bold"
          fontSize={{base: "1rem", md: "1.4rem"}}
        >
          {text}
        </FormLabel>
        <Textarea
          id={id}
          placeholder={placeholder}
          resize="none"
          bg="default_white"
          borderColor={errors[id]?"error_red":"primary"}
          border="2px"
          fontSize={{base: "1rem", md: "1.3rem"}}
          height={{base: "80px", md: "160px"}}
          {...register(id, { required, maxLength })}
        />
      </Flex>
      {errors[id] && errors[id].type === "required" && <FormErrorMessage message="Campo necessário" />}
      {errors[id] && errors[id].type === "maxLength" && <FormErrorMessage message="Máximo de caracteres ultrapassado" /> }
    </>
  );
};
