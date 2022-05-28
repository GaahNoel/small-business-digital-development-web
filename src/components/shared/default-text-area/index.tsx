import { Flex, FormLabel, Textarea } from '@chakra-ui/react';

type DefaultTextAreaProps = {
  id: string;
  text: string;
  placeholder: string;
  register?: any;
};

export const DefaultTextArea = ({
  id,
  text,
  placeholder,
  register,
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
          id={id}
          placeholder={placeholder}
          resize="none"
          bg="default_white"
          borderColor="primary"
          border="2px"
          fontSize="1rem"
          {...register(id)}
        />
      </Flex>
    </>
  );
};
