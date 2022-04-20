import { Flex, FormLabel, Select, Stack } from '@chakra-ui/react';

type ItemFormSelectProps = {
  id: string;
  disabled: boolean;
  text: string;
  options?: string[];
};

export const ItemFormSelect = ({
  id,
  disabled,
  text,
  options,
}: ItemFormSelectProps) => {
  return (
    <>
      <Flex direction="column">
        <FormLabel htmlFor={`${id}_label`} color="primary">
          {text}
        </FormLabel>
        <Select id={id} size="md" borderColor="primary" isDisabled={disabled}>
          {options?.map((option, iterator) => {
            return (
              <option value={option} key={iterator}>
                {option}
              </option>
            );
          })}
        </Select>
      </Flex>
    </>
  );
};
