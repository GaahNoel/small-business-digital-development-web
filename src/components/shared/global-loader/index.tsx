import { Flex, Spinner } from '@chakra-ui/react';

export const GlobalLoader = () => {
  return (
    <Flex
      id="global-loader"
      bg="rgba(255,255,255,0.6)"
      position="fixed"
      width="100%"
      height="100vh"
      justify="center"
      align="center"
      top="0"
      sx={{
        '&': {
          zIndex: -1000,
          opacity: 0,
          transition: '0.2s opacity ease-in-out',
        },
        '&.active': { zIndex: 1000, opacity: 1 },
      }}
    >
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="primary"
        w="200px"
        h="200px"
        borderWidth="8px"
      />
    </Flex>
  );
};
