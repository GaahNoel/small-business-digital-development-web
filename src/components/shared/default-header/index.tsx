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
      <Stack
        direction="row"
        justify="space-around"
        align="center"
        margin="15px 0px 10px 0px"
        spacing={40}
      >
        <Img src="Logo.svg"></Img>
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
      </Stack>
    </>
  );
};
