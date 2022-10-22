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
        fontWeight="medium"
        width="90%"
        margin="30px auto"
        textAlign="center"
        color={color}
      >
        <Text fontSize={{ base: '16px', sm: '20px', md: '22px', lg: '26px' }}>
          {text}
        </Text>
      </Flex>
    </>
  );
};
