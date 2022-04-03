import { Flex, FormLabel, Input } from '@chakra-ui/react';

type FormInputProps = {
  id: string;
  field: string;
  type: string;
  placeholder: string;
};

const FormInput = ({ id, field, type, placeholder }: FormInputProps) => {
  return (
    <>
      <Flex direction="column" marginBottom="10px">
        <FormLabel htmlFor={`${id}_label`} color="primary">
          {field}
        </FormLabel>
        <Input
          id={`${id}`}
          type={`${type}`}
          placeholder={`${placeholder}`}
          borderColor="primary"
        />
      </Flex>
    </>
  );
};

export default FormInput;
