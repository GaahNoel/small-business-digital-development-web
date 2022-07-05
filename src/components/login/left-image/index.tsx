import { Button, Flex, Icon, Image, Stack, Text } from '@chakra-ui/react';

export const LeftImage = () => {

  return (
    <>
      <Flex
        direction="column"
        bg="primary"
        padding="20px 60px"
        borderTopRightRadius={{base: "none", lg: "full"}}
        borderBottomLeftRadius={{base: "full", lg: "none"}}
        borderBottomRightRadius="full"
        align="end"
        justify="center"
        height={{base: "35vh", lg: "100vh"}}
        width="100%"
      >
        <Image width="400px" marginRight={{base: "0px", xl: "20%"}} src="Shop.svg" alt="Shop" />
      </Flex>
    </>
  );
};
