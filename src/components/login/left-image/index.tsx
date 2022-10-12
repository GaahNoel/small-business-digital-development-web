import { Button, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';

export const LeftImage = () => {
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
          width="550px"
          fallbackSrc="/imgLoaderGrey.gif"
          marginRight={{ base: '0px', xl: '20%' }}
          src="Shop.svg"
          alt="Shop"
        />
      </Flex>
    </>
  );
};
