import { Flex, Text } from '@chakra-ui/react';

type FormErrorMessageProps = {
  message: string;
};

export const FormErrorMessage = ({ message }: FormErrorMessageProps) => {
  return (
    <>
      <Flex>
        <Text color="error_red" fontWeight="semibold">
          {message}
        </Text>
      </Flex>
    </>
  );
};

export default FormErrorMessage;
