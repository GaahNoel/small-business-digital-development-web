import { Button, IconButton, Stack } from '@chakra-ui/react';
import { IconMenu } from '../icon-menu';
import { FiHome, FiSearch, FiUser, FiLayers } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/router';

export const FooterMenu = () => {
  const router = useRouter();
  const routerNavigate = (page: string) => {
    router.push(page);
  };
  const routerBack = () => {
    router.back();
  };
  
  return (
    <>
      <Stack
        direction="row"
        align="center"
        justify="center"
        spacing={10}
        bg="default_white"
        width="100%"
        padding="10px"
        borderTopRadius="2xl"
        position="fixed"
        bottom="0"
      >
        <IconMenu
          icon={MdArrowBack}
          handleClick={() => {
            routerBack()
          }}
        />
        <IconMenu icon={FiHome} handleClick={() => routerNavigate('/')} />
        <IconButton
          as={FaPlus}
          aria-label="16px"
          bg="primary"
          _hover={{ bg: 'primary_hover' }}
          color="default_white"
          borderRadius="full"
          cursor="pointer"
          w="50px"
          h="50px"
          padding="10px"
        />

        <IconMenu
          icon={FiSearch}
          handleClick={() => {
            console.log('oi');
          }}
        />
        <IconMenu
          icon={FiUser}
          handleClick={() => {
            console.log('oi');
          }}
        />
      </Stack>
    </>
  );
};
