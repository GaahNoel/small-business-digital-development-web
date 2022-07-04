import { Button, Flex, Icon, IconButton, Stack } from '@chakra-ui/react';
import { IconMenu } from '../icon-menu';
import { FiHome, FiSearch, FiUser, FiLayers } from 'react-icons/fi';
import { FaPlus } from 'react-icons/fa';
import { MdArrowBack } from 'react-icons/md'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Fab, Action } from 'react-tiny-fab';
import 'react-tiny-fab/dist/styles.css';

export const FooterMenu = () => {
  const router = useRouter();
  const routerNavigate = (page: string) => {
    router.push(page);
  };
  const routerBack = () => {
    router.back();
  };
  const [isLoaded, setIsLoaded] = useState(false)
  
  useEffect(()=>{
    setIsLoaded(true);
  },[])

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
        display={{base: "flex", md: "none"}}
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
      </Flex>
      {isLoaded&&
      <Flex display={{base: "none", md: "flex"}}>
        <Fab
          icon={<FaPlus />}
          alwaysShowTitle={true}
          mainButtonStyles={{backgroundColor: '#5647B2'}}
          onClick={(()=>console.log("A"))}
        >
          <Action text="Voltar" style={{backgroundColor: "#7166B6"}}>
            <Icon
              as={MdArrowBack}
              aria-label="30px"
              fontSize="24px"
              cursor="pointer"
              bg="#7166B6"
              onClick={()=>routerBack()}
            />
          </Action>
          <Action text="Home" style={{backgroundColor: "#7166B6"}}>
            <Icon
              as={FiHome}
              aria-label="30px"
              fontSize="24px"
              cursor="pointer"
              bg="#7166B6"
              onClick={()=>routerNavigate('/')}
            />
          </Action>
        </Fab>
      </Flex>
      }
    </>
  );
};
