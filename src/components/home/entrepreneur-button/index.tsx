import { Button, Flex, Icon, Stack, Text } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { BsArrowUpRight } from 'react-icons/bs';
import { FiTrendingUp } from 'react-icons/fi';
import { routerNavigateUrl } from '../../../utils/router-navigate';

export const EntrepreneurButton = () => {
  const router = useRouter();

  const navigateToEntrepreneurPage = async () => {
    const homeLoader = document.getElementById('global-loader');
    homeLoader?.classList.add('active');
    router.push('entrepreneur');
  };
  return (
    <>
      <Flex
        width={{ base: '90%', sm: '65%', md: '80%', xl: '70%', '2xl': '65%' }}
      >
        <Button
          bg="primary"
          _hover={{
            bgColor: `primary_hover`,
            svg: {
              animation: 'drawIconsEntrepreneur 1s ease 1',
              animationFillMode: 'backwards',
            },
            '@keyframes drawIconsEntrepreneur': {
              '0%': {
                strokeWidth: 0,
                strokeDasharray: '1 100',
                strokeDashoffset: '0',
              },
              '100%': {
                strokeWidth: 1.5,
                strokeDasharray: '100 0',
                strokeDashoffset: '100',
              },
            },
          }}
          padding="50px"
          h="100px"
          minW="100px"
          margin={{ base: '15px auto', md: '15px auto 0px auto' }}
          boxShadow="dark-lg"
          onClick={navigateToEntrepreneurPage}
        >
          <Stack
            direction="row"
            align="center"
            spacing={4}
            color="default_white"
          >
            <Flex bg="default_white" padding="14px" borderRadius="full">
              <Icon
                as={FiTrendingUp}
                color="primary"
                strokeWidth={1.5}
                fontSize={{ base: '25px', xl: '30px', '2xl': '35px' }}
              />
            </Flex>
            <Flex direction="column" align="flex-start">
              <Text
                fontSize={{ base: '1.2rem', xl: '1.5rem', '2xl': '1.7rem' }}
              >
                Área do empreendedor
              </Text>
              <Text
                fontSize={{ base: '1rem', xl: '1.3rem', '2xl': '1.45rem' }}
                fontWeight="normal"
              >
                Gerencie aqui seus negócios
              </Text>
            </Flex>
          </Stack>
        </Button>
      </Flex>
    </>
  );
};
