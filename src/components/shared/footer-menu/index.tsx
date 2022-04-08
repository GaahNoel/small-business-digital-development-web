import { Button, IconButton, Stack } from '@chakra-ui/react';
import { IconMenu } from '../icon-menu';
import { FiHome, FiSearch, FiUser } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';

export const FooterMenu = () => {
  return (
    <>
      <Stack
        direction="row"
        align="center"
        justify="center"
        spacing={10}
        bg="default_white"
        padding="10px"
        borderTopRadius="2xl"
      >
        <IconMenu
          icon={FiHome}
          handleClick={() => {
            console.log('oi');
          }}
        />
        <IconMenu
          icon={FiHome}
          handleClick={() => {
            console.log('oi');
          }}
        />
        <IconButton
          as={FaPlus}
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
