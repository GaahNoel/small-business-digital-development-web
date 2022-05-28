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

type FormInputProps = {
  id: string;
  field: string;
  type: string;
  placeholder: string;
  icon: IconType;
};

export const FormInput = ({
  id,
  field,
  type,
  placeholder,
  icon,
}: FormInputProps) => {
  const { register } = useFormContext();

  return (
    <>
      <Flex direction="column">
        <FormLabel
          htmlFor={`${id}_label`}
          color="primary"
          fontWeight="bold"
          fontSize="1rem"
        >
          {field}
        </FormLabel>
        <InputGroup>
          <InputLeftElement
            pointerEvents="none"
          >
            <Icon as={icon} color="gray.500" fontSize="1rem" />
          </InputLeftElement>
          <Input
            {...register(id)}
            id={id}
            type={type}
            placeholder={placeholder}
            border="2px"
            borderColor="primary"
            bg="default_white"
            fontSize="1rem"
          />
        </InputGroup>
      </Flex>
    </>
  );
};
