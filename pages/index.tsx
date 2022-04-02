import { Center, Flex, Text } from '@chakra-ui/react';
import type { NextPage } from 'next';

const Home: NextPage = () => (
  <Flex width="100%" justifyContent="center">
    <Center>
      <Text> this is center</Text>
    </Center>
  </Flex>
);

export default Home;
