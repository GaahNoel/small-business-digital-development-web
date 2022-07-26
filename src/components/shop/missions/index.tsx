import { Flex, Stack, Text } from '@chakra-ui/react';

export const Missions = () => {
  return (
    <>
      <Stack
        direction="row"
        align="center"
        justify={{ base: 'center', md: 'start' }}
        bg="card_white"
        borderRadius="2xl"
        boxShadow="dark-lg"
        width={{
          base: '330px',
          sm: '355px',
          md: '405px',
          lg: '430px',
          xl: '530px',
        }}
        height={{
          base: '120px',
          sm: '140px',
          md: '160px',
          lg: '180px',
          xl: '200px',
        }}
        overflow="hidden"
        transition="0.2s border ease-in-out"
        spacing={1}
      >
        <Flex
          width="100%"
          height="100%"
          align="center"
          justify={{ base: 'center', md: 'start' }}
        >
          <Text>Test</Text>
        </Flex>
      </Stack>
    </>
  );
};
