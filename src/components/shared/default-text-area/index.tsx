import { Flex, FormLabel, Textarea } from '@chakra-ui/react';

type DefaultTextAreaProps = {
  text: string;
  placeholder: string;
};

export const DefaultTextArea = ({
  text,
  placeholder,
}: DefaultTextAreaProps) => {
  return (
    <>
      <Flex direction="column" marginBottom="10px">
        <FormLabel
          htmlFor={`descricao_label`}
          color="primary"
          fontWeight="bold"
          fontSize="1rem"
        >
          {text}
        </FormLabel>
        <Textarea
          placeholder={placeholder}
          resize="none"
          bg="default_white"
          borderColor="primary"
          border="2px"
          fontSize="1rem"
        />
      </Flex>
    </>
  );
};
