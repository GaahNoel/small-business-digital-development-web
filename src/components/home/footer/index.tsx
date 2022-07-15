import { Flex, Stack, Text } from '@chakra-ui/react';
import { DevInformation } from './dev-information';

export const Footer = () => {
  return (
    <>
      <Flex bg="secondary" flex="1" width="100%" paddingBottom="50px">
        <Flex
          margin="0px auto"
          width={{ base: '90%', lg: '80%' }}
          maxW={{ base: '100%', md: '1280' }}
          direction={{ base: 'column', md: 'row' }}
          align="start"
          justify="space-between"
        >
          <Stack
            spacing={4}
            width={{ base: '90%', md: '40%' }}
            margin={{ base: '0px auto', md: '0px' }}
          >
            <Text color="primary" fontSize="28px" fontWeight="bold">
              Sobre o projeto
            </Text>
            <Text
              color="primary"
              fontSize={{ base: '18px', md: '24px' }}
              textAlign="justify"
            >
              O foco do projeto é voltado em ajudar com o desenvolvimento
              digital dos negócios de pequenos empreendedores, de maneira a
              buscar auxiliar em seu desenvolvimento já que representam uma
              grande parcela dos negócios vigentes no país, e ainda possuem
              grandes problemas em conquistar um público.
            </Text>
          </Stack>
          <Stack
            spacing={4}
            width={{ base: '90%', md: '40%' }}
            margin={{ base: '35px auto', md: '0px' }}
          >
            <Text color="primary" fontSize="28px" fontWeight="bold">
              Sobre nós
            </Text>
            <Stack spacing={2}>
              <DevInformation
                name="Gabriel Antonio Noel"
                role="Desenvolvedor web"
                gitHubLink="https://github.com/GaahNoel"
                img="Noel.jpg"
              />
              <DevInformation
                name="Gustavo dos Santos Nogueira"
                role="Desenvolvedor RPA"
                gitHubLink="https://github.com/NGustavo011"
                img="Nogueira.jpg"
              />
            </Stack>
          </Stack>
        </Flex>
      </Flex>
    </>
  );
};
