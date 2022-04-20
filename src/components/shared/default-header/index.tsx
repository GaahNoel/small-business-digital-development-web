import { Button, Img, Stack } from '@chakra-ui/react';
import { useRouter } from 'next/router';

export const DefaultHeader = () => {
  const router = useRouter();
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
        <Button
          bg="default_white"
          _hover={{ bg: 'default_white_hover' }}
          color="primary"
          borderRadius="10px"
          onClick={() => {
            router.push('/login');
          }}
        >
          Login
        </Button>
      </Stack>
    </>
  );
};
