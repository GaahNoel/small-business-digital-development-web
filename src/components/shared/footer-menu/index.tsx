import {
  background,
  Box,
  Button,
  Flex,
  Icon,
  IconButton,
  Img,
  Stack,
  Text,
} from '@chakra-ui/react';
import { IconMenu } from '../icon-menu';
import { FiHome, FiSearch, FiUser, FiShoppingCart } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';
import FooterMenuAction from './footer-menu-action';
import { DefaultButton } from '../default-button';
import { SideCart } from './side-cart';
import useCart from '../../../hooks/cart';
import { useSession } from 'next-auth/react';
import { expectsResolvedDragConstraints } from 'framer-motion/types/gestures/drag/VisualElementDragControls';
import axios from 'axios';

export const FooterMenu = () => {
  const router = useRouter();
  const routerNavigate = (page: string) => {
    router.push(page);
  };
  const routerBack = () => {
    router.back();
  };
  const [isLoaded, setIsLoaded] = useState(false);
  const [cartIsOpen, setCartIsOpen] = useState(false);
  const cart = useCart();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const toggleCart = () => {
    setCartIsOpen(!cartIsOpen);
  };

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
        zIndex="3"
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
          icon={FiUser}
          handleClick={() => routerNavigate('/user-edit')}
        />
        <Flex>
          <Flex
            position="relative"
            bg="default_orange"
            color="default_white"
            width="22px"
            height="22px"
            justify="center"
            align="center"
            borderRadius="full"
            left="5px"
            bottom="10px"
            zIndex="1"
          >
            {cart.itemsLength}
          </Flex>
          <IconMenu icon={FiShoppingCart} handleClick={toggleCart} />
        </Flex>
      </Flex>
      {isLoaded && (
        <Flex
          display={{ base: 'none', md: 'flex' }}
          sx={{ '.rtf': { zIndex: '1' }, button: { zIndex: '1' } }}
        >
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
            <Flex>
              <Flex
                position="relative"
                bg="default_orange"
                color="default_white"
                width="25px"
                height="25px"
                justify="center"
                align="center"
                borderRadius="full"
                left="15px"
                bottom="5px"
                zIndex="4"
              >
                {cart.itemsLength}
              </Flex>
              <FooterMenuAction
                icon={FiShoppingCart}
                clickFunction={toggleCart}
              />
            </Flex>
          </Fab>
        </Flex>
      )}
      <SideCart isOpen={cartIsOpen} setIsOpen={setCartIsOpen} />
    </>
  );
};
