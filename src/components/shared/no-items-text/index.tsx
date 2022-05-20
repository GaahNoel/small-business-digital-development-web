import { Flex, Text } from '@chakra-ui/react';

type NoItemsTextProps = {
  text: string;
  color: string;
};

export const NoItemsText = ({ text, color }: NoItemsTextProps) => {
  return (
    <>
      <Flex
        direction="row"
        align="center"
        justify="center"
        fontWeight="bold"
        width="90%"
        margin="30px auto"
        textAlign="center"
        color={color}
      >
        <Text fontSize="24px">{text}</Text>
      </Flex>
    </>
  );
};
