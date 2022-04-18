import {
  Flex,
  FormLabel,
  Icon,
  Input,
  InputGroup,
  InputLeftElement,
} from '@chakra-ui/react';
import { IconType } from 'react-icons';

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
            children={<Icon as={icon} color="gray.500" fontSize="1rem" />}
          />
          <Input
            id={`${id}`}
            type={`${type}`}
            placeholder={`${placeholder}`}
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
