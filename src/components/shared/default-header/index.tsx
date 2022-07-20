import { Button, Flex, Img, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';
import { useSession, signOut } from 'next-auth/react';

export const DefaultHeader = () => {
  const router = useRouter();
  const { data: session } = useSession();

  const login = () => {
    router.push('/login');
  };

  const logout = () => {
    //console.log(session);
    signOut();
  };

  return (
    <>
      <Flex
        direction="row"
        justify="space-between"
        align="center"
        margin="15px 0px"
      >
        <Img
          src="/Logo.svg"
          cursor="pointer"
          transition={'all 0.1s ease-in-out'}
          _hover={{
            cursor: 'pointer',
            filter: 'contrast(150%)',
            transform: 'scale(1.1)',
          }}
          onClick={() => {
            router.push('/');
          }}
        ></Img>
        <Flex w="100px">
          <Button
            onClick={!session ? login : logout}
            bg="default_white"
            position={'relative'}
            _hover={{
              color: 'secondary',
              border: '1px solid white',

              _before: {
                width: '100%',
              },
            }}
            _before={{
              position: 'absolute',
              content: '""',
              width: 0,
              background: 'primary',
              bottom: 0,
              left: 0,
              height: '100%',
              transition: 'all 0.4s',
              zIndex: -1,
            }}
            _after={{
              position: 'absolute',
              content: '""',
              width: '100%',
              background: 'secondary',
              bottom: 0,
              left: 0,
              height: '100%',

              zIndex: -2,
            }}
            color="primary"
            borderRadius="10px"
            width="100%"
            overflow={'hidden'}
            zIndex={1}
            transition={'all 0.2s ease-in-out'}
          >
            {!session ? 'Login' : 'Logout'}
          </Button>
        </Flex>
      </Flex>
    </>
  );
};
