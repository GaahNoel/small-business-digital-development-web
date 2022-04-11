import { Flex, FormLabel, Select, Stack } from '@chakra-ui/react';

type ItemFormSelectProps = {
  id: string;
  disabled: boolean;
  text: string;
};

export const ItemFormSelect = ({ id, disabled, text }: ItemFormSelectProps) => {
  return (
    <>
      <Flex direction="column">
        <FormLabel htmlFor={`${id}_label`} color="primary">
          {text}
        </FormLabel>
        <Select id={id} size="md" borderColor="primary" isDisabled={disabled}>
          <option value="1">1</option>
          <option value="2">2</option>
        </Select>
      </Flex>
    </>
  );
};
