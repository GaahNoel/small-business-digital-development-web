import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsArrowUpRight } from 'react-icons/bs';

export const EntrepreneurButton = () => {
  const router = useRouter();
  return (
    <>
      <Button
        bg="primary"
        _hover={{ bg: 'primary_hover' }}
        padding="50px"
        maxW="300px"
        margin="45px auto"
        boxShadow="dark-lg"
        onClick={() => router.push('entrepreneur')}
      >
        <Stack direction="row" align="center" spacing={4} color="default_white">
          <Flex bg="default_white" padding="14px" borderRadius="full">
            <Icon as={BsArrowUpRight} color="primary" fontSize="25px" />
          </Flex>
          <Flex direction="column" align="flex-start">
            <Text fontSize="1.2rem">Área do empreendedor</Text>
            <Text fontSize="1rem" fontWeight="normal">
              Anuncie já seus produtos
            </Text>
          </Flex>
        </Stack>
      </Button>
    </>
  );
};
