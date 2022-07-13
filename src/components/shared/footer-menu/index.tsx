import {
  background,
  Button,
  Flex,
  Icon,
  IconButton,
  Stack,
} from '@chakra-ui/react';
import { IconMenu } from '../icon-menu';
import { FiHome, FiSearch, FiUser, FiLayers } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import FooterMenuAction from './footer-menu-action';

export const FooterMenu = () => {
  const router = useRouter();
  const routerNavigate = (page: string) => {
    router.push(page);
  };
  const routerBack = () => {
    router.back();
  };
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <>
      <Flex
        direction="row"
        align="center"
        justify="space-around"
        bg="default_white"
        width="100%"
        padding="10px"
        borderTopRadius="2xl"
        position="fixed"
        bottom="0"
        display={{ base: 'flex', md: 'none' }}
      >
        <IconMenu
          icon={MdArrowBack}
          handleClick={() => {
            routerBack();
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
          handleClick={() => routerNavigate('/user-edit')}
        />
      </Flex>
      {isLoaded && (
        <Flex display={{ base: 'none', md: 'flex' }}>
          <Fab
            icon={<FaPlus />}
            alwaysShowTitle={true}
            event={'hover'}
            mainButtonStyles={{ backgroundColor: '#5647B2' }}
          >
            <FooterMenuAction icon={MdArrowBack} clickFunction={routerBack} />
            <FooterMenuAction
              icon={FiHome}
              clickFunction={() => routerNavigate('/')}
            />
            <FooterMenuAction
              icon={FiUser}
              clickFunction={() => routerNavigate('/user-edit')}
            />
          </Fab>
        </Flex>
      )}
    </>
  );
};
