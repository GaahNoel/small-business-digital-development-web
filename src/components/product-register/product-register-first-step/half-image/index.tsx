import { Button, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';

export const HalfImage = () => {
  return (
    <>
      <Flex
        direction="column"
        bg="primary_opacity"
        padding="20px 60px"
        borderBottomRightRadius="500px"
        align="end"
        justify="center"
        height={{ base: '35vh', lg: '100vh' }}
        width="100%"
      >
        <Image
          fallbackSrc="/imgLoader.gif"
          width="400px"
          marginRight="10%"
          src="/Item.svg"
          alt="Shop"
        />
      </Flex>
    </>
  );
};
