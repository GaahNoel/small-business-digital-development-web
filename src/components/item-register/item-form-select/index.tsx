import { Flex, FormLabel, Select, Stack } from '@chakra-ui/react';

type ItemFormSelectProps = {
  id: string;
  disabled: boolean;
  text: string;
  options?: [
    {
      id: string;
      name: string;
    },
  ];
  register?: any;
};

export const ItemFormSelect = ({
  id,
  disabled,
  text,
  options,
  register,
}: ItemFormSelectProps) => {
  return (
    <>
      <Flex direction="column">
        <FormLabel htmlFor={`${id}_label`} color="primary">
          {text}
        </FormLabel>
        <Select
          id={id}
          size="md"
          borderColor="primary"
          isDisabled={disabled}
          {...register(id)}
        >
          {options?.map((option, iterator) => {
            return (
              <option value={option.id} key={iterator}>
                {option.name}
              </option>
            );
          })}
        </Select>
      </Flex>
    </>
  );
};
