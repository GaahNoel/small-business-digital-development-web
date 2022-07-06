import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsArrowUpRight } from 'react-icons/bs';

export const EntrepreneurButton = () => {
  const router = useRouter();
  return (
    <>
      <Flex width={{base: "90%", sm:"65%", md:"80%", xl:"70%", '2xl': "65%"}}>
        <Button
          bg="primary"
          _hover={{ bg: 'primary_hover' }}
          padding="50px"
          h="100px"
          minW="100px"
          margin={{base: "15px auto", md: "15px auto 0px auto"}}
          boxShadow="dark-lg"
          onClick={() => router.push('entrepreneur')}
        >
          <Stack direction="row" align="center" spacing={4} color="default_white">
            <Flex bg="default_white" padding="14px" borderRadius="full">
              <Icon as={BsArrowUpRight} color="primary" fontSize={{base: "25px", xl: "30px", '2xl': "35px"}} />
            </Flex>
            <Flex direction="column" align="flex-start">
              <Text fontSize={{base: "1.2rem", xl: "1.5rem", '2xl': "1.7rem"}}>Área do empreendedor</Text>
              <Text fontSize={{base: "1rem", xl: "1.3rem", '2xl': "1.45rem"}} fontWeight="normal">
                Anuncie já seus produtos
              </Text>
            </Flex>
          </Stack>
        </Button>
      </Flex>
    </>
  );
};
