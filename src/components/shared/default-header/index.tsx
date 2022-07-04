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
          onClick={() => {
            router.push('/');
          }}
        ></Img>
        <Flex w="100px">
          {!session ? (
            <Button
              bg="default_white"
              _hover={{ bg: 'default_white_hover' }}
              color="primary"
              borderRadius="10px"
              width="100%"
              onClick={login}
            >
              Login
            </Button>
          ) : (
            <Button
              bg="default_white"
              _hover={{ bg: 'default_white_hover' }}
              color="primary"
              borderRadius="10px"
              width="100%"
              onClick={logout}
            >
              Logout
            </Button>
          )}
        </Flex>
      </Flex>
    </>
  );
};
