import {
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';
import { useFormContext } from 'react-hook-form';
import FormErrorMessage from '../form-error-message';

type FormInputProps = {
  id: string;
  field: string;
  type: string;
  placeholder: string;
  icon: IconType;
  required?: boolean;
  maxLength?: number;
};

export const FormInput = ({
  id,
  field,
  type,
  placeholder,
  icon,
  required = true,
  maxLength = 50,
}: FormInputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <>
      <Flex direction="column">
        <FormLabel
          htmlFor={`${id}_label`}
          color="primary"
          fontWeight="bold"
          fontSize={{ base: '1rem', md: '1.4rem' }}
        >
          {field}
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
            marginTop={{ base: '0px', md: '10px' }}
          >
            <Icon
              as={icon}
              color="gray.500"
              fontSize={{ base: '1rem', md: '1.3rem' }}
            />
          </InputLeftElement>
          <Input
            {...register(id, { required, maxLength })}
            id={id}
            type={type}
            placeholder={placeholder}
            border="2px"
            borderColor={errors[id] ? 'error_red' : 'primary'}
            bg="default_white"
            fontSize={{ base: '1rem', md: '1.3rem' }}
            height={{ base: '40px', md: '60px' }}
          />
        </InputGroup>
        {errors[id] && errors[id].type === 'required' && (
          <FormErrorMessage message="Campo necessário" />
        )}
        {errors[id] && errors[id].type === 'maxLength' && (
          <FormErrorMessage message="Máximo de caracteres ultrapassado" />
        )}
      </Flex>
    </>
  );
};
